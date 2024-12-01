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
      className={`p-2 rounded-lg transition-colors ${
        active
          ? 'bg-blue-100 dark:bg-blue-900'
          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
      title={title}
    >
      {icon}
    </button>
  );
}