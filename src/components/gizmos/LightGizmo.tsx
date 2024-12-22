import { Html, Sphere } from "@react-three/drei";
import { NeuronLight } from "../../types/light";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { Cone, Globe2Icon, LightbulbIcon } from "lucide-react";


interface LightGizmoProps {
    light: NeuronLight;
    selected: boolean;
}

export const LightGizmo = ({ light, selected }: LightGizmoProps) => {
    const iconMap = {
        point: <LightbulbIcon className="w-4 h-4" />,
        spot: <Cone className="w-4 h-4" />,
        directional: <Globe2Icon className="w-4 h-4" />
    }

    const sphereRef = useRef<Mesh>(null);

    useFrame(({ clock }) => {
        if (selected && sphereRef.current) {
            const pulse = Math.sin(clock.getElapsedTime() * 3) * 0.1 + 1;
            sphereRef.current.scale.setScalar(pulse);
        }
    });

    const renderGizmoByType = () => {
        switch (light.type) {
            case "point":
                return (
                    <group>
                        <Sphere ref={sphereRef} args={[0.2, 16, 16]}>
                            <meshBasicMaterial
                                color={light.color}
                                transparent
                                opacity={0.4}
                            />
                        </Sphere>
                    </group>
                );

            case "spot":
                return (
                    <group>
                        <Sphere ref={sphereRef} args={[0.2, 16, 16]}>
                            <meshBasicMaterial
                                color={light.color}
                                transparent
                                opacity={0.4}
                            />
                        </Sphere>
                    </group>
                );

            case "directional":
                return (
                    <group>
                        <Sphere ref={sphereRef} args={[0.2, 16, 16]}>
                            <meshBasicMaterial
                                color={light.color}
                                transparent
                                opacity={0.4}
                            />
                        </Sphere>
                    </group>
                );
        }
    };
    
    return (
        <group position={light.position}>
            {renderGizmoByType()}
            {selected && (
                <Html center>
                    <div className="p-2 text-xs bg-black/75 text-white rounded-full">
                        {iconMap[light.type]}
                    </div>
                </Html>
            )}
        </group>
    );
}