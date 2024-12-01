import { useRef, useEffect, useMemo } from 'react';
import { Html } from '@react-three/drei';
import { Vector3 } from 'three';
import { Light } from '../../types/editor';
import { Lightbulb, Disc, Cone } from 'lucide-react';

interface LightGizmoProps {
  light: Light;
  selected: boolean;
}

const iconMap = {
  ambient: Disc,
  point: Lightbulb,
  spot: Cone,
} as const;

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

  const IconComponent = iconMap[light.type];

  const containerStyle = useMemo(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: selected ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    padding: '0.5rem',
    width: '40px',
    height: '40px',
    boxShadow: selected ? '0px 0px 10px rgba(255, 255, 255, 0.8)' : 'none',
  }), [selected]);

  if (!IconComponent) return null;

  return (
    <Html position={light.position} center>
      <div style={containerStyle}>
        <IconComponent 
          size={32} 
          color={light.color} 
          className={light.type === 'spot' ? '-rotate-45' : ''} 
        />
      </div>
    </Html>
  );
}