import { Scene } from './components/Canvas/Scene';
import { Toolbar } from './components/UI/Toolbar/Toolbar.tsx';
import { Sidebar } from './components/UI/Sidebar';
import { useEditorStore } from './store/editorStore';
import { NotificationContainer } from './components/UI/Notifications/NotificationContainer';
import { Canvas } from '@react-three/fiber';
import { PCFSoftShadowMap } from 'three';
import {Suspense} from "react";

export default function App() {
  const { settings } = useEditorStore();

  return (
    <div className={`w-full h-screen font-sans bg-neutral-900 ${settings.theme === 'dark' ? 'dark' : ''}`}>
      <Suspense fallback={null}>
        <Canvas
          shadows={{
            type: PCFSoftShadowMap
          }}
          dpr={[1, 1.5]}
          gl={{
            preserveDrawingBuffer: true,
            antialias: true,
          }}
          camera={{ position: [5, 5, 5], fov: 75 }}
        >
          <Scene />
        </Canvas>
      </Suspense>

      <NotificationContainer />
      <Sidebar />
      <Toolbar />
    </div>
  );
}