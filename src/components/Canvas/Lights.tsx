import { useEditorStore } from '../../store/editorStore';
import { useCallback, useRef } from 'react';
import { Object3D } from 'three';
import { SpotLight, TransformControls, useDepthBuffer } from '@react-three/drei';
import { LightGizmo } from './LightGizmo';
import { Vector3D } from '../../types/math';

import {Light} from "../../types/scene.ts";

interface LightComponentProps {
  light: Light;
  lightRef: (ref: Object3D | null) => void;
  selected: boolean;
  depthBuffer: any;
}

const LightComponent = ({ light, lightRef, selected, depthBuffer }: LightComponentProps) => {
  switch (light.type) {
    case 'ambient':
      return (
        <ambientLight
          intensity={light.intensity}
          color={light.color}
          castShadow
        />
      );
    case 'point':
      return (
        <pointLight
          ref={lightRef}
          position={light.position}
          intensity={light.intensity}
          color={light.color}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
      );
    case 'spot':
      return (
        <SpotLight
          ref={lightRef}
          position={light.position}
          angle={0.5}
          distance={10}
          attenuation={5}
          anglePower={light.intensity}
          penumbra={0.5}
          intensity={2}
          volumetric={true}
          color={light.color}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
          depthBuffer={depthBuffer}
          debug={selected}
        />
      );
    default:
      return null;
  }
};

export function Lights() {
  const { lights, selectedId, updateLight, gizmoMode } = useEditorStore();
  const lightRefs = useRef<{ [key: string]: Object3D | null }>({});
  const depthBuffer = useDepthBuffer({ size: 512 });

  const handleTransform = useCallback((lightId: string) => {
    const lightObj = lightRefs.current[lightId];
    if (lightObj) {
      const position = lightObj.position.toArray();
      updateLight(lightId, { position: position as Vector3D });
    }
  }, [updateLight]);

  const setLightRef = useCallback((id: string) => (ref: Object3D | null) => {
    lightRefs.current[id] = ref;
  }, []);

  return (
    <>
      {lights.map((light) => (
        <group key={light.id}>
          <LightComponent
            light={light}
            lightRef={setLightRef(light.id)}
            selected={selectedId === light.id}
            depthBuffer={depthBuffer}
          />
          <LightGizmo light={light} selected={selectedId === light.id} />
          {selectedId === light.id && (
            <TransformControls
              // @ts-ignore
              object={lightRefs.current[light.id]}
              mode={gizmoMode}
              onObjectChange={() => handleTransform(light.id)}
            />
          )}
        </group>
      ))}
    </>
  );
}