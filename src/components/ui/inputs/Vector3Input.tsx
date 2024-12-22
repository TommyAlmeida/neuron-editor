import { Input } from "../natives/input";
import { Label } from "../natives/label";

interface Vector3InputProps {
    label: string;
    value: [number, number, number];
    onChange: (value: [number, number, number]) => void;
    step?: number;
}

export function Vector3Input({
    label,
    value,
    onChange,
    step = 0.1,
}: Vector3InputProps) {
    const handleAxisChange = (axis: 0 | 1 | 2, newValue: number) => {
        const newVector: [number, number, number] = [...value] as [number, number, number];
        newVector[axis] = newValue;
        onChange(newVector);
    };

    return (
        <div className="space-y-2">
            <Label className="text-neutral-200">{label}</Label>
            <div className="grid grid-cols-3 gap-2">
                <div>
                    <Label className="text-xs text-white">X</Label>
                    <Input
                        type="number"
                        value={value[0]}
                        onChange={(e) => handleAxisChange(0, Number(e.target.value))}
                        step={step}
                        className="w-full text-neutral-300"
                    />
                </div>
                <div>
                    <Label className="text-xs text-white">Y</Label>
                    <Input
                        type="number"
                        value={value[1]}
                        onChange={(e) => handleAxisChange(1, Number(e.target.value))}
                        step={step}
                        className="w-full text-neutral-300"
                    />
                </div>
                <div>
                    <Label className="text-xs text-white">Z</Label>
                    <Input
                        type="number"
                        value={value[2]}
                        onChange={(e) => handleAxisChange(2, Number(e.target.value))}
                        step={step}
                        className="w-full text-neutral-300"
                    />
                </div>
            </div>
        </div>
    );
}