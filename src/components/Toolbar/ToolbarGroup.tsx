interface ToolbarGroupProps {
    children: React.ReactNode;
}

export function ToolbarGroup({ children }: ToolbarGroupProps) {
    return (
        <>
            {children}
            <div className="w-px bg-gray-200 dark:bg-gray-700 mx-2" />
        </>
    );
}