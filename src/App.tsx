import { Canvas } from "@react-three/fiber"
import { Scene } from "./components/Scene"
import { Toolbar } from "./components/ui/Toolbar"
import { HierarchyPanel } from "./components/ui/panels/HierarchyPanel"
import { useSelectionManager } from "./hooks/useSelectionManager"

function App() {
  useSelectionManager()
  
  return (
    <div className="h-screen w-screen antialiased font-sans bg-neutral-900">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        shadows
        gl={{ antialias: true, preserveDrawingBuffer: true }}
      >
        <Scene />
      </Canvas>
      <Toolbar />
      <HierarchyPanel />
    </div>
  )
}

export default App
