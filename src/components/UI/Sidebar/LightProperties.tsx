import { Light } from '../../../types/editor';

interface LightPropertiesProps {
  light: Light;
  onUpdate: (updates: Partial<Light>) => void;
}

export function LightProperties({ light, onUpdate }: LightPropertiesProps) {
  const handlePositionChange = (axis: 'x' | 'y' | 'z', value: number) => {
    const position = [...light.position] as [number, number, number];
    position['xyz'.indexOf(axis)] = value;
    onUpdate({ position });
  };

  return (
    <div className="space-y-4">
      {light.type !== 'ambient' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Position
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['x', 'y', 'z'] as const).map((axis, i) => (
              <input
                key={axis}
                type="number"
                value={light.position[i]}
                onChange={(e) => handlePositionChange(axis, parseFloat(e.target.value) || 0)}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm dark:bg-gray-700 dark:text-white"
                placeholder={axis.toUpperCase()}
              />
            ))}
          </div>
        </div>

      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Intensity
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={light.intensity}
          onChange={(e) => onUpdate({ intensity: parseFloat(e.target.value) })}
          className="w-full"
        />
        <input
          type="number"
          value={light.intensity}
          onChange={(e) => onUpdate({ intensity: parseFloat(e.target.value) || 0 })}
          step="0.1"
          className="mt-2 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Color
        </label>
        <div className="md:relative h-14 fixed left-4 right-4 bottom-6 z-40 md:inset-0 form-control border border-color rounded-md overflow-hidden">
          <input
            type="color"
            value={light.color}
            defaultValue={light.color}
            onChange={(e) => onUpdate({ color: e.target.value })}
            className="absolute top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-full border-none left-4 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}