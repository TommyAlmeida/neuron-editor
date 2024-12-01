import { useRef, useEffect } from 'react';
import { Sphere, Line, Html } from '@react-three/drei';
import { Vector3 } from 'three';
import { Light } from '../../types/editor';

interface LightGizmoProps {
  light: Light;
  selected: boolean;
}

export function LightGizmo({ light, selected }: LightGizmoProps) {
  const lineRef = useRef<any>();

  useEffect(() => {
    if (light.type === 'directional' && lineRef.current) {
      const points = [
        new Vector3(...light.position),
        new Vector3(light.position[0], light.position[1] - 2, light.position[2]),
      ];
      lineRef.current.geometry.setFromPoints(points);
    }
  }, [light.position, light.type]);

  const getGizmoSize = () => {
    switch (light.type) {
      case 'ambient':
        return 0.5;
      case 'point':
        return 0.3;
      case 'directional':
        return 0.4;
      default:
        return 0.3;
    }
  };

  return (
    <group>
      <Sphere position={light.position} args={[getGizmoSize()]}>
        <meshBasicMaterial
          color={light.color}
          transparent
          opacity={selected ? 0.8 : 0.3}
          wireframe={selected}
        />
      </Sphere>
      {light.type === 'directional' && (
        <>
          <Line
            ref={lineRef}
            points={[light.position, [light.position[0], light.position[1] - 2, light.position[2]]]}
            color={light.color}
            lineWidth={2}
          />
          <Html position={light.position}>
            <div className="bg-black/50 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
              {light.name}
            </div>
          </Html>
        </>
      )}
    </group>
  );
}