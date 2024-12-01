// components/Canvas/Model.tsx
import { useEffect, useRef } from 'react';
import { MaterialType, Object3D as Object3DType } from '../../types/editor';
import { useStore } from '../../store/editorStore';
import { TransformControls } from '@react-three/drei';
import { Mesh, Group } from 'three';
import { ThreeEvent } from '@react-three/fiber';
import { Vector3D } from '../../types/math';

function Geometry({ object }: { object: Object3DType }) {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);

  const { selectObject, selectedId, updateObject, gizmoMode } = useStore();

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    selectObject(object.id);
  };

  const handleTransform = () => {
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
  };

  const renderBasedOnMaterial = (material: MaterialType) => {
    switch (material) {
      case 'standard':
        return (
          <meshStandardMaterial
            color={object.material.color}
            metalness={object.material.metalness}
            roughness={object.material.roughness}
            wireframe={object.material.wireframe}
            transparent={object.material.transparent}
          />
        );
      case 'basic':
        return (
          <meshBasicMaterial
         
            color={object.material.color}
            wireframe={object.material.wireframe}
            transparent={object.material.transparent}
          />
        );
      case 'phong':
        return (
          <meshPhongMaterial
            color={object.material.color}
            wireframe={object.material.wireframe}
            transparent={object.material.transparent}
          />
        );
      case 'physical':
        return (
          <meshPhysicalMaterial
          shadowSide={2}
            color={object.material.color}
            metalness={object.material.metalness}
            roughness={object.material.roughness}
            wireframe={object.material.wireframe}
          />
        );
      default:
        return null;
    }
  }

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
        {renderBasedOnMaterial(object.material.type)}
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

  return (
    <group onClick={(e) => {
      if (e.target === e.currentTarget) {
        selectObject(null);
      }
    }}>
      {objects.map((object) => (
        <Geometry key={object.id} object={object} />
      ))}
    </group>
  );
}