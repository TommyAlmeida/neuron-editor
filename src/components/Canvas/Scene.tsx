import {OrbitControls, Grid, PerspectiveCamera, Environment, GizmoHelper, GizmoViewport,} from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { useEditorStore } from '../../store/editorStore';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import {Lights} from "./Lights";
import {Model} from "./Model";

export function Scene() {
  const { camera } = useThree();
  const { settings } = useEditorStore();

  useKeyboardShortcuts();

  useEffect(() => {
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      <color attach="background" args={['#242626']} />
      <PerspectiveCamera makeDefault position={[5, 5, 5]} />
      <OrbitControls makeDefault />

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

      <Lights />
      <Model />
      <fogExp2 attach="fog" color="white" density={0.1}/>
      <Environment preset="forest" background={false} blur={0.5} />
      <GizmoHelper alignment="bottom-left" margin={[80, 80]}>
          <GizmoViewport
              axisColors={['#ff3653', '#0adb50', '#2c8fdf']}
              labelColor="black"
          />
      </GizmoHelper>
    </>
  );
}