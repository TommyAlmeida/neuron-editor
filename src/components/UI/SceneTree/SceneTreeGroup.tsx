import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronRight, ChevronDown, FolderOpen, Folder } from 'lucide-react';
import { Group, Object3D, Light } from '../../../types/editor';
import { SceneTreeItem } from './SceneTreeItem';
import { useStore } from '../../../store/editorStore';
import { ItemMenu } from '../Sidebar/ItemMenu';

interface SceneTreeGroupProps {
  group: Group;
  items: (Object3D | Light)[];
  selected: boolean;
}

export function SceneTreeGroup({ group, items, selected }: SceneTreeGroupProps) {
  const { updateGroup, selectedId } = useStore();
  const [isOpen, setIsOpen] = useState(group.isOpen);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: group.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const toggleGroup = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    updateGroup(group.id, { isOpen: newIsOpen });
  };

  return (
    <div ref={setNodeRef} style={style} className="select-none text-sm">
      <div
        className={`flex items-center p-2 rounded-lg ${selected
            ? 'bg-blue-900 text-blue-300'
            : 'hover:bg-[#242627]'
          }`}
        {...attributes}
        {...listeners}
      >
        <button
          className="p-1 hover:bg-[#242627] rounded mr-1"
          onClick={toggleGroup}
        >
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </button>

        <div className="flex items-center flex-1 cursor-move">
          {isOpen ? (
            <FolderOpen className="w-4 h-4 mr-2 text-gray-400" />
          ) : (
            <Folder className="w-4 h-4 mr-2 text-gray-400" />
          )}
          <span className='text-gray-400'>{group.name}</span>
        </div>

        <ItemMenu item={group} />
      </div>

      {isOpen && items.length > 0 && (
        <div className="ml-6 space-y-1 mt-1">
          {items.map((item) => (
            <SceneTreeItem
              key={item.id}
              item={item}
              selected={selectedId === item.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}