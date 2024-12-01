import { Object3D } from '../../../types/editor';

interface ObjectPropertiesProps {
  object: Object3D;
  onUpdate: (updates: Partial<Object3D>) => void;
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

  const handleMaterialChange = (updates: Partial<Object3D['material']>) => {
    onUpdate({
      material: {
        ...object.material,
        ...updates,
      },
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Position
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['x', 'y', 'z'] as const).map((axis, i) => (
            <input
              key={axis}
              type="number"
              value={object.position[i]}
              onChange={(e) => handlePositionChange(axis, parseFloat(e.target.value) || 0)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder={axis.toUpperCase()}
            />
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rotation
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['x', 'y', 'z'] as const).map((axis, i) => (
            <input
              key={axis}
              type="number"
              value={object.rotation[i]}
              onChange={(e) => handleRotationChange(axis, parseFloat(e.target.value) || 0)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder={axis.toUpperCase()}
            />
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Scale
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['x', 'y', 'z'] as const).map((axis, i) => (
            <input
              key={axis}
              type="number"
              value={object.scale[i]}
              onChange={(e) => handleScaleChange(axis, parseFloat(e.target.value) || 0)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder={axis.toUpperCase()}
            />
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Material
        </label>
        <div className="space-y-2">
          <select
            value={object.material.type}
            onChange={(e) => handleMaterialChange({ type: e.target.value as Object3D['material']['type'] })}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="standard">Standard</option>
            <option value="basic">Basic</option>
            <option value="phong">Phong</option>
            <option value="physical">Physical</option>
          </select>

          <div className="flex items-center gap-2">
            <label className="text-sm">Color:</label>
            <input
              type="color"
              value={object.material.color}
              onChange={(e) => handleMaterialChange({ color: e.target.value })}
              className="w-16 h-8"
            />
          </div>

          {object.material.type !== 'basic' && (
            <>
              <div className="flex items-center gap-2">
                <label className="text-sm">Metalness:</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={object.material.metalness}
                  onChange={(e) => handleMaterialChange({ metalness: parseFloat(e.target.value) })}
                  className="flex-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm">Roughness:</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={object.material.roughness}
                  onChange={(e) => handleMaterialChange({ roughness: parseFloat(e.target.value) })}
                  className="flex-1"
                />
              </div>
            </>
          )}

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={object.material.wireframe}
                onChange={(e) => handleMaterialChange({ wireframe: e.target.checked })}
              />
              <span className="text-sm">Wireframe</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={object.material.transparent}
                onChange={(e) => handleMaterialChange({ transparent: e.target.checked })}
              />
              <span className="text-sm">Transparent</span>
            </label>
          </div>

          {object.material.transparent && (
            <div className="flex items-center gap-2">
              <label className="text-sm">Opacity:</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={object.material.opacity}
                onChange={(e) => handleMaterialChange({ opacity: parseFloat(e.target.value) })}
                className="flex-1"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}