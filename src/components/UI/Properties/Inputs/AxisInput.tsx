import { Vector3D } from "../../../../types/math";

interface AxisInputProps {
    label: string;
    axes: Array<'x' | 'y' | 'z'>;
    values: Vector3D;
    onChange: (axis: 'x' | 'y' | 'z', value: number) => void;
}

export const AxisInput: React.FC<AxisInputProps> = ({ label, axes, values, onChange }) => {
    return (
        <div>
            <label className="block text-sm text-gray-400 mb-1">
                {label}
            </label>
            <div className="grid grid-cols-3 gap-2">
                {axes.map((axis, i) => (
                    <input
                        key={axis}
                        type="number"
                        value={values[i]}
                        onChange={(e) => onChange(axis, parseFloat(e.target.value) || 0)}
                        className="block w-full px-3 py-2 border border-neutral-700 text-gray-400 bg-neutral-800 focus:ring-blue-500 focus:border-blue-500 rounded-md text-sm"
                        placeholder={axis.toUpperCase()}
                    />
                ))}
            </div>
        </div>
    );
};
