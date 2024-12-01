import { useStore } from '../../store/editorStore';
import { useRef } from 'react';
import { Object3D } from 'three';
import { SpotLight, TransformControls, useDepthBuffer } from '@react-three/drei';
import { LightGizmo } from './LightGizmo';
import { Vector3D } from '../../types/math';

export function Lights() {
  const { lights, selectedId, updateLight, gizmoMode } = useStore();
  const lightRefs = useRef<{ [key: string]: Object3D | null }>({});

  const depthBuffer = useDepthBuffer({ size: 2256 })

  return (
    <>
      {lights.map((light) => {
        const handleTransform = () => {
          const lightObj = lightRefs.current[light.id];

          if (lightObj) {
            const position = lightObj.position.toArray();
            

            updateLight(light.id, { position: position as Vector3D });
          }
        };

        const renderLight = () => {
          switch (light.type) {
            case 'ambient':
              return (
                <ambientLight
                  key={light.id}
                  intensity={light.intensity}
                  color={light.color}
                />
              );
            case 'point':
              return (
                <pointLight
                  ref={(ref) => {
                    lightRefs.current[light.id] = ref;
                  }}
                  position={light.position}
                  intensity={light.intensity}
                  color={light.color}
                  castShadow
                />
              );
            case 'spot':
              return (
                <SpotLight
                  ref={(ref) => {
                    lightRefs.current[light.id] = ref;
                  }}
                
                  position={light.position}
                  angle={0.5}
                  anglePower={light.intensity}
                  penumbra={0.5}
                  volumetric={true}
                  color={light.color}
                  debug
                />
              );
            default:
              return null;
          }
        };

        return (
          <group key={light.id}>
            {renderLight()}
            <LightGizmo light={light} selected={selectedId === light.id} />
            {selectedId === light.id && (
              <TransformControls
                //@ts-expect-error NO CLUE, YET?
                object={lightRefs.current[light.id]}
                mode={gizmoMode}
                onObjectChange={handleTransform}
              />
            )}
          </group>
        );
      })}
    </>
  );
}