import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Object3D, Light } from '../../../types/editor';
import { useStore } from '../../../store/editorStore';
import { Cuboid, Lightbulb } from 'lucide-react';
import { ItemMenu } from '../Sidebar/ItemMenu';

interface SceneTreeItemProps {
  item: Object3D | Light;
  selected: boolean;
}

export function SceneTreeItem({ item, selected }: SceneTreeItemProps) {
  const { selectObject } = useStore();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectObject(item.id);
  };

  const getIcon = () => {
    if ('intensity' in item) {
      return <Lightbulb className="w-4 h-4 mr-2" />;
    }
    return <Cuboid className="w-4 h-4 mr-2" />;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center p-2 rounded-lg ${
        selected
          ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center flex-1 cursor-move" {...attributes} {...listeners}>
        {getIcon()}
        <span>{item.name}</span>
      </div>
      
      <ItemMenu item={item} />
      
    </div>
  );
}