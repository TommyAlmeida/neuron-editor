import { useRef, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { Vector3 } from 'three';
import { Light } from '../../types/editor';
import { Lightbulb, Disc, Cone } from 'lucide-react';

interface LightGizmoProps {
  light: Light;
  selected: boolean;
}

export function LightGizmo({ light, selected }: LightGizmoProps) {
  const lineRef = useRef<any>();

  useEffect(() => {
    if (light.type === 'spot' && lineRef.current) {
      const points = [
        new Vector3(...light.position),
        new Vector3(light.position[0], light.position[1] - 2, light.position[2]),
      ];
      lineRef.current.geometry.setFromPoints(points);
    }
  }, [light.position, light.type]);

  const renderIcon = () => {
    switch (light.type) {
      case 'ambient':
        return <Disc size={32} color={light.color} />;
      case 'point':
        return <Lightbulb size={32} color={light.color} />;
      case 'spot':
        return <Cone className='-rotate-45' size={32} color={light.color} />;
      default:
        return null;
    }
  };

  return (
    <group>
      {/* Icon */}
      <Html position={light.position} center>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: selected ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.5)',
            borderRadius: '50%',
            padding: '0.5rem',
            width: '40px',
            height: '40px',
            boxShadow: selected ? '0px 0px 10px rgba(255, 255, 255, 0.8)' : 'none',
          }}
        >
          {renderIcon()}
        </div>
      </Html>
    </group>
  );
}
