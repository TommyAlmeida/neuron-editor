import { useStore } from '../../store/editorStore';
import { useRef } from 'react';
import { Object3D } from 'three';
import { TransformControls } from '@react-three/drei';
import { LightGizmo } from './LightGizmo';

export function Lights() {
  const { lights, selectedId, updateLight } = useStore();
  const lightRefs = useRef<{ [key: string]: Object3D | null }>({});

  return (
    <>
      {lights.map((light) => {
        const handleTransform = () => {
          const lightObj = lightRefs.current[light.id];
          if (lightObj) {
            const position = lightObj.position.toArray();
            updateLight(light.id, { position: position as [number, number, number] });
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
            case 'directional':
              return (
                <directionalLight
                  ref={(ref) => {
                    lightRefs.current[light.id] = ref;
                  }}
                  position={light.position}
                  intensity={light.intensity}
                  color={light.color}
                  castShadow
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
                //@ts-expect-error ddd
                object={lightRefs.current[light.id]}
                mode="translate"
                onObjectChange={handleTransform}
              />
            )}
          </group>
        );
      })}
    </>
  );
}