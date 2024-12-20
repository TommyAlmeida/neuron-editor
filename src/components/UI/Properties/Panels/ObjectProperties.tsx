import { memo, useCallback } from "react";
import { Vector3D } from "../../../../types/math";
import { AxisInput } from "../Inputs/AxisInput";
import { MaterialProperties } from "./MaterialProperties";
import {SceneObject} from "../../../../types/scene.ts";

interface ObjectPropertiesProps {
  object: SceneObject;
  onUpdate: (updates: Partial<SceneObject>) => void;
}

export const ObjectProperties = memo(({ object, onUpdate }: ObjectPropertiesProps) => {
  const updateVector = useCallback((property: keyof Pick<SceneObject, 'position' | 'rotation' | 'scale'>) =>
    (axis: 'x' | 'y' | 'z', value: number) => {
      const values = [...object[property]] as Vector3D;
      values['xyz'.indexOf(axis)] = value;
      onUpdate({ [property]: values });
    }, [object, onUpdate]);

  const handleMaterialChange = useCallback((updates: Partial<SceneObject['material']>) => {
    onUpdate({
      material: {
        ...object.material,
        ...updates,
      },
    });
  }, [object.material, onUpdate]);

  return (
    <div className="space-y-4">
      <AxisInput
        label="Position"
        axes={['x', 'y', 'z']}
        values={object.position}
        onChange={updateVector('position')}
      />

      <AxisInput
        label="Rotation"
        axes={['x', 'y', 'z']}
        values={object.rotation}
        onChange={updateVector('rotation')}
      />

      <AxisInput
        label="Scale"
        axes={['x', 'y', 'z']}
        values={object.scale}
        onChange={updateVector('scale')}
      />

      <div>
        <label className="block text-sm text-gray-400 mb-1">
          Material
        </label>
        <MaterialProperties
          material={object.material}
          onMaterialChange={handleMaterialChange}
        />
      </div>
    </div>
  );
});

ObjectProperties.displayName = 'ObjectProperties';