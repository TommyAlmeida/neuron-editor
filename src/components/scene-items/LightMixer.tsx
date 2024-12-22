import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useSceneStore } from "../../store/useSceneStore";
import * as THREE from "three";

export const LightMixer = () => {
    const { lights } = useSceneStore();
    const { scene } = useThree();

    useEffect(() => {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
        scene.add(ambientLight);

        scene.traverse((object) => {
            if (object instanceof THREE.Mesh && object.material instanceof THREE.MeshStandardMaterial) {
                object.material.roughness = 0.7;
                object.material.metalness = 0.3;
                object.castShadow = true;
                object.receiveShadow = true;
            }
        });

        return () => {
            scene.remove(ambientLight);
        };
    }, [scene]);

    useEffect(() => {
        lights.forEach(light => {
            const lightObject = scene.getObjectByProperty('uuid', light.id) as THREE.Light;
            if (lightObject) {
                if (lightObject instanceof THREE.PointLight || lightObject instanceof THREE.SpotLight) {
                    lightObject.decay = 2;
                    lightObject.shadow.bias = -0.001;
                    lightObject.shadow.mapSize.width = 1024;
                    lightObject.shadow.mapSize.height = 1024;
                }
            }
        });
    }, [lights, scene]);

    return null;
};