import { OrbitControls, Grid, PerspectiveCamera, Environment, Effects } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { Model } from './Model';
import { Lights } from './Lights';
import { useStore } from '../../store/editorStore';
import { SelectionOutline } from './SelectionOutline';

export function Scene() {
  const { camera } = useThree();
  const { settings, selectedId } = useStore();

  useEffect(() => {
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[5, 5, 5]} />
      <OrbitControls makeDefault />
      <color attach="background" args={[settings.theme === 'dark' ? '#1a1a1a' : '#f3f4f6']} />
      <Lights />
      {settings.gridEnabled && (
        <Grid
          infiniteGrid
          fadeDistance={50}
          fadeStrength={5}
          cellSize={settings.gridSize}
          sectionSize={settings.gridSize * 5}
          cellThickness={0.5}
          sectionThickness={1}
          cellColor={settings.theme === 'dark' ? '#404040' : '#cccccc'}
          sectionColor={settings.theme === 'dark' ? '#606060' : '#999999'}
        />
      )}
      <Model />
      <Environment preset="forest" background backgroundBlurriness={0.5} />
      <Effects>
        <SelectionOutline selectedId={selectedId} />
      </Effects>
    </>
  );
}