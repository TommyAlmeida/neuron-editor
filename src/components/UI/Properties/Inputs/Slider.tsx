interface SliderProps {
    label: string;
    value: number | undefined;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
}

export const Slider: React.FC<SliderProps> = ({
    label,
    value,
    onChange,
    min = 0,
    max = 1,
    step = 0.01
}) => {
    return (
        <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">{label}</label>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="flex-1 bg-neutral-800 appearance-none rounded-full cursor-pointer"
            />
        </div>
    );
};