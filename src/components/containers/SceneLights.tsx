import { TransformControls, useDepthBuffer } from "@react-three/drei";
import { useCallback, useRef } from "react";
import { Object3D } from "three";
import { useSceneStore } from "../../store/useSceneStore";
import { Vector3d } from "../../types/geometry";
import { Light } from "../scene-items/Light";
import { useEditorStore } from "../../store/useEditorStore";
import { LightGizmo } from "../gizmos/LightGizmo";

export const SceneLights = () => {
    const { lights, selectedObjectId, updateLight } = useSceneStore();
    const { transformMode } = useEditorStore();

    const lightRefs = useRef<{ [key: string]: Object3D | null }>({});
    const depthBuffer = useDepthBuffer({ size: 512 });

    const handleTransform = useCallback((lightId: string) => {
        const lightObj = lightRefs.current[lightId];
        if (lightObj) {
            const position = lightObj.position.toArray();
            updateLight(lightId, { position: position as Vector3d });
        }
    }, [updateLight]);

    const setLightRef = useCallback((id: string) => (ref: Object3D | null) => {
        lightRefs.current[id] = ref;
    }, []);


    return lights.map((light) => {
        return (
            <group position-y={-0.5} key={light.id}>
                <Light
                    light={light}
                    lightRef={setLightRef(light.id)}
                    selected={selectedObjectId === light.id}
                    depthBuffer={depthBuffer}
                />

                <LightGizmo light={light} selected={selectedObjectId === light.id} />

                {selectedObjectId === light.id && (
                    <TransformControls
                        //@ts-ignore
                        object={lightRefs.current[light.id]}
                        mode={transformMode}
                        onObjectChange={() => handleTransform(light.id)}
                    />
                )}
            </group>
        )
    })
}