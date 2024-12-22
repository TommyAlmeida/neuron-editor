import { useState, useRef } from 'react';
import { Grip, Minus, Maximize2, X } from 'lucide-react';
import { PanelConfig } from '../../../types/panel';
import { cn } from '../../../utils';

interface PanelProps {
  config: PanelConfig;
  children: React.ReactNode;
  className?: string;
}

export function Panel({ config, children, className }: PanelProps) {
  const [isDragging, setIsDragging] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.MouseEvent) => {
    if (!config.isFloating) return;
    setIsDragging(true);
    
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;

    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleDrag = (e: MouseEvent) => {
      if (!panelRef.current) return;
      
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      
      panelRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
    };

    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('mouseup', handleDragEnd);
  };

  return (
    <div
      ref={panelRef}
      className={cn(
        'flex flex-col rounded-lg border border-neutral-800 bg-neutral-900 shadow-lg',
        config.isFloating && 'fixed',
        isDragging && 'cursor-grabbing',
        className
      )}
      style={{
        width: config.size?.width,
        height: config.size?.height,
      }}
    >
      <div
        className="flex items-center px-4 py-2 border-b border-neutral-800 cursor-grab bg-neutral-900"
        onMouseDown={handleDragStart}
      >
        <Grip className="w-4 h-4 mr-2 text-neutral-400" />
        <span className="font-medium text-neutral-200">{config.title}</span>
        <div className="ml-auto flex items-center space-x-2">
          <button
            className="p-1 hover:bg-neutral-800 rounded-sm text-neutral-400 hover:text-neutral-200"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            className="p-1 hover:bg-neutral-800 rounded-sm text-neutral-400 hover:text-neutral-200"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            className="p-1 hover:bg-neutral-800 rounded-sm text-neutral-400 hover:text-neutral-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      {!config.isCollapsed && (
        <div className="flex-1 p-4 overflow-auto bg-neutral-900">{children}</div>
      )}
    </div>
  );
}