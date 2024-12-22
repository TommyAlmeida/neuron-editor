import { Environment, GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, Sky, Stars, Stats } from "@react-three/drei";
import { Ground } from "./scene-items/Ground";
import { SceneObjects } from "./containers/SceneObjects";
import { SceneLights } from "./containers/SceneLights";

export function Scene() {
    return (
        <>
            <group position-y={-0.5}>
                <PerspectiveCamera makeDefault position={[5, 5, 5]} />
                <OrbitControls makeDefault />
                <Environment preset="night" blur={0.5} />

                <hemisphereLight color={'#ffffff'} intensity={0.5} />
                <directionalLight castShadow intensity={0.8} position={[100, 100, 100]} />

                <SceneLights />
                <SceneObjects />

                <Ground />

                <Stars />
                <Sky rayleigh={3.14} sunPosition={[100, -100, 100]} />

                <Stats />

                <GizmoHelper alignment="bottom-left" margin={[80, 80]}>
                    <GizmoViewport
                        axisColors={['#ff3653', '#03db50', '#2c8fdf']}
                        labelColor="black"
                    />
                </GizmoHelper>
            </group >
        </>
    )
}