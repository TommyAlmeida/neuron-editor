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
    <div className="absolute top-2 right-2 h-[80vh] rounded-md w-64 bg-neutral-900 border-r-gray-500 shadow-lg p-4 flex flex-col z-50">
      <SceneTree />

      {(selectedObject || selectedLight) && (
        <div className="flex-1 overflow-y-auto mt-10">
          <h3 className="font-medium mb-2 text-white">Properties</h3>
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