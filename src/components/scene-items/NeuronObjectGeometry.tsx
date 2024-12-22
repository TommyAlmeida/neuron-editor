import { Group, Mesh } from "three";
import { useSceneStore } from "../../store/useSceneStore";
import { NeuronObject } from "../../types/scene";
import { useCallback, useEffect, useRef } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { Edges, TransformControls } from "@react-three/drei";
import { Vector3d } from "../../types/geometry";
import { useEditorStore } from "../../store/useEditorStore";

export function NeuronObjectGeometry({ object }: { object: NeuronObject }) {
    const { selectObject, selectedObjectId, removeObject, updateObject } = useSceneStore();
    const { transformMode, setIsTransforming } = useEditorStore();

    const meshRef = useRef<Mesh>(null);
    const groupRef = useRef<Group>(null);

    const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        selectObject(object.id);
    }, [object.id, selectObject]);

    const handleTransform = useCallback(() => {
        if (meshRef.current) {
            const position = meshRef.current.position.toArray();
            const rotation = meshRef.current.rotation.toArray().slice(0, 3);
            const scale = meshRef.current.scale.toArray();

            updateObject(object.id, {
                position: position as Vector3d,
                rotation: rotation as Vector3d,
                scale: scale as Vector3d,
            });
        }
    }, [object.id, updateObject]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.key === 'Delete' || e.key === 'Backspace') && selectedObjectId === object.id) {
                removeObject(selectedObjectId);
                selectObject(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedObjectId, selectObject, removeObject, object.id]);



    const renderType = () => {
        switch (object.type) {
            case 'box':
                return <boxGeometry />
            case 'sphere':
                return <sphereGeometry />
            case 'cylinder':
                return <cylinderGeometry />
            case 'plane':
                return <planeGeometry />
            case 'torus':
                return <torusGeometry />
            default:
                return null
        }
    }
    
    return (
        <group ref={groupRef}>
            <mesh
                ref={meshRef}
                position={object.position}
                scale={object.scale}
                castShadow
                onClick={handleClick}
                receiveShadow
                onPointerOver={(e) => {
                    e.stopPropagation();
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={(e) => {
                    e.stopPropagation();
                    document.body.style.cursor = 'default';
                }}
            >
                {renderType()}
                <meshPhongMaterial />
                <Edges visible={selectedObjectId === object.id} color="#fff" />
            </mesh>

            {meshRef.current && selectedObjectId === object.id && (
                <TransformControls 
                    object={meshRef.current} 
                    mode={transformMode} 
                    onMouseDown={() => setIsTransforming(true)}
                    onMouseUp={() => setIsTransforming(false)}
                    onChange={handleTransform}
                />
            )}
        </group>
    );
}