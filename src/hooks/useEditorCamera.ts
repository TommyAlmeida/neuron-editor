import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

export function useEditorCamera() {
  const { camera, controls } = useThree();

  const focusObject = (position: [number, number, number]) => {
    const target = new Vector3(...position);
    
    // Animate camera position
    if (controls) {
      // @ts-ignore - assuming controls is OrbitControls
      controls.target.copy(target);
      controls.update();
    }

    // Move camera to a good viewing position
    const offset = new Vector3(5, 5, 5);
    camera.position.copy(target.clone().add(offset));
  };

  return { focusObject };
}