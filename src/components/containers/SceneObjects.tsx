import { useCallback, useEffect } from "react";
import { useSceneStore } from "../../store/useSceneStore"
import { NeuronObjectGeometry } from "../scene-items/NeuronObjectGeometry";
import { ThreeEvent } from "@react-three/fiber";
import { useEditorStore } from "../../store/useEditorStore";

export const SceneObjects = () => {
    const { objects, selectObject, selectedGeometry, addObject } = useSceneStore();
    const { isTransforming } = useEditorStore();

    useEffect(() => {
        if (selectedGeometry) {
            addObject(selectedGeometry);
            selectObject(null);
        }
    }, [selectedGeometry, addObject, selectObject]);

    const handleSceneClick = useCallback((e: ThreeEvent<MouseEvent>) => {
        if (isTransforming) return;
        
        if (e.object.type === 'GridHelper' || e.object.type === 'Plane' || e.object.type === 'Group') {
            e.stopPropagation();
            selectObject(null);
        }
    }, [selectObject, isTransforming]);

    return <group
        onClick={handleSceneClick}
        onPointerMissed={() => !isTransforming && selectObject(null)}
    >
        {objects.map((object) =>
            <NeuronObjectGeometry key={object.id} object={object} />
        )}
    </group>

}