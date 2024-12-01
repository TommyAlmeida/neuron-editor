import { EditorObject } from '../../../types/editor';
import { AxisInput } from '../Properties/Inputs/AxisInput';
import { Checkbox } from '../Properties/Inputs/Checkbox';
import { ColorPicker } from '../Properties/Inputs/ColorPickerSelector';
import { MaterialTypeSelector } from '../Properties/Inputs/MaterialTypeSelector';
import { Slider } from '../Properties/Inputs/Slider';


interface ObjectPropertiesProps {
  object: EditorObject;
  onUpdate: (updates: Partial<EditorObject>) => void;
}

export function ObjectProperties({ object, onUpdate }: ObjectPropertiesProps) {
  const handlePositionChange = (axis: 'x' | 'y' | 'z', value: number) => {
    const position = [...object.position] as [number, number, number];
    position['xyz'.indexOf(axis)] = value;
    onUpdate({ position });
  };

  const handleRotationChange = (axis: 'x' | 'y' | 'z', value: number) => {
    const rotation = [...object.rotation] as [number, number, number];
    rotation['xyz'.indexOf(axis)] = value;
    onUpdate({ rotation });
  };

  const handleScaleChange = (axis: 'x' | 'y' | 'z', value: number) => {
    const scale = [...object.scale] as [number, number, number];
    scale['xyz'.indexOf(axis)] = value;
    onUpdate({ scale });
  };

  const handleMaterialChange = (updates: Partial<EditorObject['material']>) => {
    onUpdate({
      material: {
        ...object.material,
        ...updates,
      },
    });
  };

  return (
    <div className="space-y-4">
      <AxisInput
        label="Position"
        axes={['x', 'y', 'z']}
        values={object.position}
        onChange={handlePositionChange}
      />

      <AxisInput
        label="Rotation"
        axes={['x', 'y', 'z']}
        values={object.rotation}
        onChange={handleRotationChange}
      />

      <AxisInput
        label="Scale"
        axes={['x', 'y', 'z']}
        values={object.scale}
        onChange={handleScaleChange}
      />

      <div>
        <label className="block text-sm text-gray-400 mb-1">
          Material
        </label>
        <div className="space-y-4">
          <MaterialTypeSelector
            currentType={object.material.type}
            onChange={(type) => handleMaterialChange({ type })}
          />

          <ColorPicker
            color={object.material.color}
            onChange={(color) => handleMaterialChange({ color })}
          />

          {object.material.type !== 'basic' && (
            <>
              <Slider
                label="Metalness"
                value={object.material.metalness}
                onChange={(metalness) => handleMaterialChange({ metalness })}
              />

              <Slider
                label="Roughness"
                value={object.material.roughness}
                onChange={(roughness) => handleMaterialChange({ roughness })}
              />
            </>
          )}

          <div className="flex items-center gap-4">
            <Checkbox
              label="Wireframe"
              checked={object.material.wireframe}
              onChange={(wireframe) => handleMaterialChange({ wireframe })}
            />

            <Checkbox
              label="Transparent"
              checked={object.material.transparent}
              onChange={(transparent) => handleMaterialChange({ transparent })}
            />
          </div>

          {object.material.transparent && (
            <Slider
              label="Opacity"
              value={object.material.opacity}
              onChange={(opacity) => handleMaterialChange({ opacity })}
            />
          )}
        </div>
      </div>
    </div>
  );
}