interface ColorPickerProps {
    color: string;
    onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Color</label>
            <input
                type="color"
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="w-8 h-8 bg-neutral-900 rounded-full"
            />
        </div>
    );
};