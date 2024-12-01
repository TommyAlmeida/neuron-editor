import { useEffect, useRef } from 'react';
import { Box, Sphere, Cylinder, TransformControls } from '@react-three/drei';
import { useStore } from '../../store/editorStore';
import { ThreeEvent } from '@react-three/fiber';
import { Object3D as Object3DType } from '../../types/editor';
import { Mesh } from 'three';

function Geometry({ object }: { object: Object3DType }) {
  const ref = useRef<Mesh>(null);
  const selectObject = useStore((state) => state.selectObject);
  const selectedId = useStore((state) => state.selectedId);
  const updateObject = useStore((state) => state.updateObject);
  const { gizmoMode } = useStore((state) => state);

  const getMaterial = () => {
    const materialProps = {
      color: object.material.color,
      metalness: object.material.metalness,
      roughness: object.material.roughness,
      wireframe: object.material.wireframe,
      transparent: object.material.transparent,
      opacity: object.material.opacity,
    };

    switch (object.material.type) {
      case 'basic':
        return <meshBasicMaterial {...materialProps} />;
      case 'phong':
        return <meshPhongMaterial {...materialProps} />;
      case 'physical':
        return <meshPhysicalMaterial {...materialProps} />;
      default:
        return <meshStandardMaterial {...materialProps} />;
    }
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    selectObject(object.id);
  };

  const handleTransform = () => {
    if (ref.current) {
      const position = ref.current.position.toArray();
      const rotation = ref.current.rotation.toArray().slice(0, 3);
      const scale = ref.current.scale.toArray();
      // @ts-expect-error dunno
      updateObject(object.id, { position, rotation, scale });
    }
  };

  const props = {
    position: object.position,
    rotation: object.rotation,
    scale: object.scale,
    onClick: handleClick,
  };

  return (
    <>
      <>
        {object.type === 'box' && (
          <Box receiveShadow ref={ref} {...props}>
            {getMaterial()}
          </Box>
        )}
        {object.type === 'sphere' && (
          <Sphere receiveShadow ref={ref} {...props}>
            {getMaterial()}
          </Sphere>
        )}
        {object.type === 'cylinder' && (
          <Cylinder receiveShadow ref={ref} {...props}>
            {getMaterial()}
          </Cylinder>
        )}
        {selectedId === object.id && (
          // @ts-expect-error dunno
          <TransformControls mode={gizmoMode} object={ref} onObjectChange={handleTransform} />
        )}
      </>
    </>
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