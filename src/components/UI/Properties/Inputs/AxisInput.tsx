import { Vector3D } from "../../../../types/math";

interface AxisInputProps {
    label: string;
    axes: Array<'x' | 'y' | 'z'>;
    values: Vector3D;
    onChange: (axis: 'x' | 'y' | 'z', value: number) => void;
}

export const AxisInput: React.FC<AxisInputProps> = ({ label, axes, values, onChange }) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
                {label}
            </label>
            <div className="grid grid-cols-3 gap-3">
                {axes.map((axis, i) => (
                    <input
                        key={axis}
                        type="number"
                        value={values[i]}
                        onChange={(e) => onChange(axis, parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-600 text-gray-300 bg-neutral-800 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 rounded-md text-sm transition duration-200 placeholder-gray-500 hover:border-gray-500"
                        placeholder={axis.toUpperCase()}
                    />
                ))}
            </div>
        </div>
    );
};