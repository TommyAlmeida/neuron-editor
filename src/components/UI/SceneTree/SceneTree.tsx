import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useStore } from '../../../store/editorStore';
import { FolderPlus } from 'lucide-react';
import { useCallback } from 'react';
import { SceneTreeGroup } from './SceneTreeGroup';
import { SceneTreeItem } from './SceneTreeItem';

export function SceneTree() {
  const {
    objects,
    lights,
    groups,
    selectedId,
    moveItem,
    addGroup,
  } = useStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeId = active.id as string;
      const overId = over.id as string;

      // Check if dropping onto a group
      const targetGroup = groups.find(g => g.id === overId);
      if (targetGroup) {
        moveItem(activeId, overId);
      } else {
        // If dropping onto another item or root, move to root
        moveItem(activeId, null);
      }
    }
  }, [groups, moveItem]);

  // Get all root items (items without a parent)
  const rootItems = [...objects, ...lights].filter(item => !item.parentId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-2 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium text-lg">Scene Hierarchy</h2>
          <button
            onClick={addGroup}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Add Group"
          >
            <FolderPlus className="w-5 h-5" />
          </button>
        </div>

        <SortableContext
          items={[...rootItems.map(item => item.id), ...groups.map(group => group.id)]}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-1">
            {rootItems.map((item) => (
              <SceneTreeItem
                key={item.id}
                item={item}
                selected={selectedId === item.id}
              />
            ))}

            {groups.map((group) => (
              <SceneTreeGroup
                key={group.id}
                group={group}
                items={[...objects, ...lights].filter(item => item.parentId === group.id)}
                selected={selectedId === group.id}
              />
            ))}
          </div>
        </SortableContext>
      </div>
    </DndContext>
  );
}