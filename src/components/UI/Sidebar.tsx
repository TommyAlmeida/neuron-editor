import { Grip } from 'lucide-react';
import { useStore } from '../../store/editorStore';
import { ObjectProperties } from './Sidebar/ObjectProperties';
import { LightProperties } from './Sidebar/LightProperties';
import { SceneTree } from './SceneTree/SceneTree';

export function Sidebar() {
  const objects = useStore((state) => state.objects);
  const lights = useStore((state) => state.lights);
  const selectedId = useStore((state) => state.selectedId);
  const updateObject = useStore((state) => state.updateObject);
  const updateLight = useStore((state) => state.updateLight);

  const selectedObject = objects.find((obj) => obj.id === selectedId);
  const selectedLight = lights.find((light) => light.id === selectedId);

  return (
    <div className="absolute right-4 top-4 bottom-4 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Scene</h2>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <Grip className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        </button>
      </div>

      <SceneTree />

      {(selectedObject || selectedLight) && (
        <div className="flex-1 overflow-y-auto">
          <h3 className="font-medium mb-2 text-gray-800 dark:text-white">Properties</h3>
          {selectedObject && (
            <ObjectProperties
              object={selectedObject}
              onUpdate={(updates) => updateObject(selectedObject.id, updates)}
            />
          )}
          {selectedLight && (
            <LightProperties
              light={selectedLight}
              onUpdate={(updates) => updateLight(selectedLight.id, updates)}
            />
          )}
        </div>
      )}
    </div>
  );
}