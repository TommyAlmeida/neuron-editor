import { memo, useCallback } from "react";
import { Vector3D } from "../../../../types/math";
import { AxisInput } from "../Inputs/AxisInput";
import { Slider } from "../Inputs/Slider";
import {Light} from "../../../../types/scene.ts";

interface LightPropertiesProps {
  light: Light;
  onUpdate: (updates: Partial<Light>) => void;
}

const ColorInput = memo(({ value, onChange }: { 
  value: string, 
  onChange: (value: string) => void 
}) => (
  <div className="md:relative h-14 fixed left-4 right-4 bottom-6 z-40 md:inset-0 form-control border border-color rounded-md overflow-hidden">
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="absolute top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-full border-none left-4 cursor-pointer"
    />
  </div>
));

ColorInput.displayName = 'ColorInput';

export const LightProperties = memo(({ light, onUpdate }: LightPropertiesProps) => {
  const handlePositionChange = useCallback((axis: 'x' | 'y' | 'z', value: number) => {
    const position = [...light.position] as Vector3D;
    position['xyz'.indexOf(axis)] = value;
    onUpdate({ position });
  }, [light.position, onUpdate]);

  return (
    <div className="space-y-4">
      {light.type !== 'ambient' && (
        <AxisInput
          label="Position"
          axes={['x', 'y', 'z']}
          values={light.position}
          onChange={handlePositionChange}
        />
      )}

      <Slider
        label="Intensity"
        value={light.intensity}
        min={0}
        max={2}
        step={0.1}
        onChange={(intensity) => onUpdate({ intensity })}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Color
        </label>
        <ColorInput 
          value={light.color} 
          onChange={(color) => onUpdate({ color })} 
        />
      </div>
    </div>
  );
});

LightProperties.displayName = 'LightProperties';