import { OrbitControls, Grid, PerspectiveCamera, Environment } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { Model } from './Model';
import { Lights } from './Lights';
import { useStore } from '../../store/editorStore';

export function Scene() {
  const { camera } = useThree();
  const { settings } = useStore();

  useEffect(() => {
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[5, 5, 5]} />
      <OrbitControls makeDefault />

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
      
      <Environment preset="forest" background={false} blur={0.5} />

      <Model />
      <color attach="background" args={['#242626']} />
    </>
  );
}