import { useEditorStore } from '../../store/editorStore';
import { SceneTree } from './SceneTree/SceneTree';
import { ObjectProperties } from './Properties/Panels/ObjectProperties';
import { LightProperties } from './Properties/Panels/LightProperties';
import {Light, SceneObject} from "../../types/scene.ts";

export function Sidebar() {
  const objects = useEditorStore((state) => state.objects);
  const lights = useEditorStore((state) => state.lights);
  const selectedId = useEditorStore((state) => state.selectedId);
  const updateObject = useEditorStore((state) => state.updateObject);
  const updateLight = useEditorStore((state) => state.updateLight);

  const selectedObject = objects.find((obj) => obj.id === selectedId);
  const selectedLight = lights.find((light) => light.id === selectedId);

  return (
    <div className="absolute top-4 right-2 h-[80vh] rounded-md w-64 bg-neutral-900 border-r-gray-500 shadow-lg p-4 flex flex-col z-50">
      <SceneTree />

      {(selectedObject || selectedLight) && (
        <div className="flex-1 overflow-y-auto mt-10">
          <h3 className="font-medium mb-2 text-white">Properties</h3>
          {selectedObject && (
            <ObjectProperties
              object={selectedObject}
              onUpdate={(updates: Partial<SceneObject>) => updateObject(selectedObject.id, updates)}
            />
          )}
          {selectedLight && (
            <LightProperties
              light={selectedLight}
              onUpdate={(updates: Partial<Light>) => updateLight(selectedLight.id, updates)}
            />
          )}
        </div>
      )}
    </div>
  );
}