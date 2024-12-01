import { useCallback, useState } from 'react';
import { Tooltip } from "../UI/Tooltip";

interface ToolbarButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  title: string;
  active?: boolean;
  cooldown?: number;
}

export function ToolbarButton({ 
  icon, 
  onClick, 
  title, 
  active, 
  cooldown = 250 
}: ToolbarButtonProps) {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = useCallback(() => {
    if (!isDisabled) {
      onClick();
      setIsDisabled(true);
      setTimeout(() => setIsDisabled(false), cooldown);
    }
  }, [onClick, cooldown, isDisabled]);

  return (
    <Tooltip content={title} position="right">
      <button
        onClick={handleClick}
        disabled={isDisabled}
        className={`flex justify-center p-2 rounded-lg transition-colors group ${
          active
            ? 'bg-neutral-800 border border-blue-500'
            : 'hover:bg-neutral-800'
        } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        title={title}
      >
        {icon}
      </button>
    </Tooltip>
  );
}