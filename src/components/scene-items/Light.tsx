import { SpotLight } from "@react-three/drei";
import { NeuronLight } from "../../types/light";
import { Object3D } from "three";

interface LightComponentProps {
    light: NeuronLight;
    lightRef: (ref: Object3D | null) => void;
    selected: boolean;
    depthBuffer: any;
}

export const Light = ({ light, lightRef, selected, depthBuffer }: LightComponentProps) => {
    
    switch (light.type) {
        case "point":
            return <pointLight
                ref={lightRef}
                castShadow
                position={light.position}
                intensity={light.intensity}
            />
        case "spot":
            return <SpotLight
                ref={lightRef}
                position={light.position}
                angle={0.5}
                distance={10}
                attenuation={5}
                anglePower={light.intensity}
                penumbra={0.5}
                intensity={2}
                volumetric={true}
                color={light.color}
                castShadow
                receiveShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.0001}
                depthBuffer={depthBuffer}
                debug={selected} />
        default:
            return null;
    }
}