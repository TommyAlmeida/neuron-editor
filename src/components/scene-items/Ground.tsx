import { Grid } from "@react-three/drei"
import { useEffect, useRef } from "react";
import { Mesh } from "three";
import { GROUND_LAYER } from "../../types/layers";

export function Ground() {
    const meshRef = useRef<Mesh>(null);

    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.layers.set(GROUND_LAYER);
        }
    }, []);

    const gridConfig = {
        cellSize: 0.5,
        cellThickness: 0.5,
        cellColor: '#404040',
        sectionSize: 1,
        sectionThickness: 1,
        sectionColor: '#404040',
        fadeDistance: 50,
        fadeStrength: 1,
        infiniteGrid: true
    }
    return <mesh ref={meshRef} position={[0, -0.5, 0]}>
        <Grid {...gridConfig} />
    </mesh>

}