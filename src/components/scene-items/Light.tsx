import { SpotLight, useHelper } from "@react-three/drei";
import { NeuronLight } from "../../types/light";
import { DirectionalLight, DirectionalLightHelper, Object3D, PointLight, PointLightHelper, SpotLight as ThreeSpotLight, SpotLightHelper, Group } from "three";
import { MutableRefObject, useRef } from "react";
import { LightGizmo } from "../gizmos/LightGizmo";

interface LightComponentProps {
    light: NeuronLight;
    lightRef: (ref: Object3D | null) => void;
    selected: boolean;
    depthBuffer: any;
}

export const Light = ({ light, lightRef, selected, depthBuffer }: LightComponentProps) => {
    const lightGroupRef = useRef<Group>(null);
    const pointLightRef = useRef<PointLight |  null>(null);
    const spotLightRef = useRef<ThreeSpotLight |  null>(null);
    const directionalLightRef = useRef<DirectionalLight |  null>(null);

    // Show helpers when selected
    useHelper(
        selected && pointLightRef.current ? (pointLightRef as MutableRefObject<PointLight>) : null,
        PointLightHelper,
        0.5
    );
    useHelper(
        selected && spotLightRef.current ? (spotLightRef as MutableRefObject<ThreeSpotLight>) : null,
        SpotLightHelper,
        light.color
    );
    useHelper(
        selected && directionalLightRef.current ? (directionalLightRef as MutableRefObject<DirectionalLight>) : null,
        DirectionalLightHelper,
        0.5
    );

    const renderLight = () => {
        switch (light.type) {
            case "point":
                return (
                    <pointLight
                        ref={(ref) => {
                            if (ref) {
                                lightRef(ref);
                                pointLightRef.current = ref;
                            }
                        }}
                        position={light.position}
                        color={light.color}
                        intensity={light.intensity}
                        distance={light.distance}
                        decay={light.decay}
                        castShadow
                    />
                );
            case "spot":
                return (
                    <SpotLight
                        ref={(ref) => {
                            if (ref) {
                                lightRef(ref);
                                // @ts-ignore - SpotLight from drei has a different type
                                spotLightRef.current = ref;
                            }
                        }}
                        position={light.position}
                        color={light.color}
                        intensity={light.intensity}
                        distance={light.distance}
                        angle={light.angle}
                        penumbra={light.penumbra}
                        decay={light.decay}
                        castShadow
                        depthBuffer={depthBuffer}
                    />
                );
            case "directional":
                return (
                    <directionalLight
                        ref={(ref) => {
                            if (ref) {
                                lightRef(ref);
                                directionalLightRef.current = ref;
                            }
                        }}
                        position={light.position}
                        color={light.color}
                        intensity={light.intensity}
                        castShadow
                    />
                );
            default:
                return null;
        }
    };
    
    return (
        <group ref={lightGroupRef}>
            {renderLight()}
            <LightGizmo light={light} selected={selected} />
        </group>
    );
}