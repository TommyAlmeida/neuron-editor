import { useEffect, useRef, useCallback } from 'react';
import { EditorObject } from '../../types/editor';
import { useStore } from '../../store/editorStore';
import { TransformControls } from '@react-three/drei';
import { Mesh, Group } from 'three';
import { ThreeEvent } from '@react-three/fiber';
import { Vector3D } from '../../types/math';

interface GeometryProps {
  object: EditorObject;
}

function Geometry({ object }: GeometryProps) {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);

  const { selectObject, selectedId, updateObject, gizmoMode, deleteObject } = useStore();

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
        position: position as Vector3D,
        rotation: rotation as Vector3D,
        scale: scale as Vector3D,
      });
    }
  }, [object.id, updateObject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId === object.id) {
        deleteObject(selectedId);
        selectObject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, selectObject, deleteObject, object.id]);

  const renderMaterial = useCallback(() => {
    const commonProps = {
      color: object.material.color,
      wireframe: object.material.wireframe,
      transparent: object.material.transparent,
      opacity: object.material.opacity,
    };

    switch (object.material.type) {
      case 'standard':
        return (
          <meshStandardMaterial
            {...commonProps}
            shadowSide={2}
            metalness={object.material.metalness}
            roughness={object.material.roughness}
          />
        );
      case 'basic':
        return <meshBasicMaterial shadowSide={2} {...commonProps} />;
      case 'phong':
        return <meshPhongMaterial shadowSide={2} {...commonProps} />;
      case 'physical':
        return (
          <meshPhysicalMaterial
            {...commonProps}
            metalness={object.material.metalness}
            roughness={object.material.roughness}
            shadowSide={2}
          />
        );
      default:
        return null;
    }
  }, [object.material]);

  return (
    <group ref={groupRef} onClick={handleClick}>
      <mesh
        ref={meshRef}
        position={object.position}
        rotation={object.rotation}
        scale={object.scale}
        castShadow
        receiveShadow
        userData={{ id: object.id }}
      >
        {object.type === 'box' && <boxGeometry />}
        {object.type === 'sphere' && <sphereGeometry />}
        {object.type === 'cylinder' && <cylinderGeometry />}
        {object.type === 'plane' && <planeGeometry />}
        {renderMaterial()}
      </mesh>
      {selectedId === object.id && (
        <TransformControls
        // @ts-ignore
          object={meshRef.current}
          mode={gizmoMode}
          onObjectChange={handleTransform}
        />
      )}
    </group>
  );
}

export function Model() {
  const objects = useStore((state) => state.objects);
  const selectedGeometry = useStore((state) => state.selectedGeometry);
  const addObject = useStore((state) => state.addObject);
  const selectObject = useStore((state) => state.selectObject);

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

  return (
    <group onClick={handleSceneClick}>
      {objects.map((object) => (
        <Geometry key={object.id} object={object} />
      ))}
    </group>
  );
}