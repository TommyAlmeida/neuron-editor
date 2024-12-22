import { useCallback, useEffect } from "react";
import { useSceneStore } from "../../store/useSceneStore"
import { NeuronObjectGeometry } from "../scene-items/NeuronObjectGeometry";
import { ThreeEvent } from "@react-three/fiber";

export const SceneObjects = () => {
    const { objects, selectObject, selectedGeometry, addObject } = useSceneStore();

    useEffect(() => {
        if (selectedGeometry) {
            addObject(selectedGeometry);
            selectObject(null);
        }
    }, [selectedGeometry, addObject, selectObject]);

    const handleSceneClick = useCallback((e: ThreeEvent<MouseEvent>) => {
        if (e.target === e.currentTarget) {
            selectObject(null);
        }
    }, [selectObject]);

    return <group onClick={handleSceneClick} renderOrder={2}>
        {objects.map((object) =>
            <NeuronObjectGeometry key={object.id} object={object} />
        )}
    </group>

}