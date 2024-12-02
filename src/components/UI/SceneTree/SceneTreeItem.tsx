import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEditorStore } from '../../../store/editorStore';
import { Box, Lightbulb } from 'lucide-react';
import { ItemMenu } from '../Sidebar/ItemMenu';
import { useRef, useState } from 'react';
import {Light, SceneObject} from "../../../types/scene.ts";

interface SceneTreeItemProps {
  item: SceneObject | Light;
  selected: boolean;
}

interface SceneTreeItemProps {
  item: SceneObject | Light;
  selected: boolean;
}

export function SceneTreeItem({ item, selected }: SceneTreeItemProps) {
  const { selectObject } = useEditorStore();
  const [isDragging, setIsDragging] = useState(false);
  const moveThreshold = useRef(5);
  const startPos = useRef<{ x: number; y: number } | null>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: item.id,
    data: item,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(false);
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startPos.current) {
      const dx = Math.abs(e.clientX - startPos.current.x);
      const dy = Math.abs(e.clientY - startPos.current.y);
      if (dx > moveThreshold.current || dy > moveThreshold.current) {
        setIsDragging(true);
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) {
      e.stopPropagation();
      selectObject(item.id);
    }
    startPos.current = null;
    setIsDragging(false);
  };

  const getIcon = () => {
    if ('intensity' in item) {
      return <Lightbulb className="w-4 h-4 mr-2" />;
    }
    return <Box className="w-4 h-4 mr-2" />;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex text-sm items-center p-2 gap-2 rounded-lg ${selected
        ? 'bg-neutral-800 border-2 border-blue-900 text-white'
        : 'hover:bg-neutral-800 text-gray-400'
        } transition-colors duration-200 z-10`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className="flex items-center flex-1 cursor-pointer select-none"
        {...attributes}
        {...listeners}
      >
        <div className={selected ? 'text-white' : 'text-gray-400'}>
          {getIcon()}
        </div>
        <span>{item.name}</span>
      </div>

      <ItemMenu item={item} />
    </div>
  );
}