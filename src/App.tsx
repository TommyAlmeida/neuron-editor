import { Scene } from './components/Canvas/Scene';
import { Toolbar } from './components/UI/Toolbar';
import { Sidebar } from './components/UI/Sidebar';
import { useStore } from './store/editorStore';
import { NotificationContainer } from './components/UI/Notifications/NotificationContainer';
import { Canvas } from '@react-three/fiber';
import { PCFSoftShadowMap } from 'three';
import { AnimationTimeline } from './components/UI/Animation/Timeline/AnimationTimeline';

export default function App() {
  const { settings } = useStore();

  return (
    <div className={`w-full h-screen font-sans ${settings.theme === 'dark' ? 'dark' : ''}`}>
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
      <NotificationContainer />
      <Sidebar />
      <Toolbar />
      <AnimationTimeline />
    </div>
  );
}