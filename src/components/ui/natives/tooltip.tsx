interface TooltipProps {
    content: string;
    position?: 'top' | 'right' | 'bottom' | 'left';
    children: React.ReactNode;
}

export function Tooltip({ content, position = 'top', children }: TooltipProps) {
    const positionClasses = {
        top: 'bottom-full mb-2',
        right: 'left-full top-2 ml-2',
        bottom: 'top-full mt-2',
        left: 'right-full mr-2',
    };

    return (
        <div className="relative flex justify-center group z-10">
            {children}
            <span
                className={`absolute ${positionClasses[position]} hidden group-hover:block text-xs bg-black text-white py-1 px-2 rounded whitespace-nowrap`}
            >
                {content}
            </span>
        </div>
    );
}