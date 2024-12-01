interface ToolbarButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  title: string;
  active?: boolean;
}

export function ToolbarButton({ icon, onClick, title, active }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center p-2 rounded-lg transition-colors ${
        active
          ? 'bg-neutral-800 border border-blue-500'
          : 'hover:bg-neutral-800 '
      }`}
      title={title}
    >
      {icon}
    </button>
  );
}