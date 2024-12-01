import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Canvas/Scene';
import { Toolbar } from './components/UI/Toolbar';
import { Sidebar } from './components/UI/Sidebar';
import { useStore } from './store/editorStore';

export default function App() {
  const { settings } = useStore();

  return (
    <div className={`w-full h-screen ${settings.theme === 'dark' ? 'dark' : ''}`}>
      <Canvas 
        shadows
        dpr={[1, 1.5]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [5, 5, 5], fov: 75 }}
      >
        <Scene />
      </Canvas>
   
        <Sidebar />
      
      <Toolbar />
    </div>
  );
}