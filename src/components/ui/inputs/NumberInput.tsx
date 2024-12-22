import { Input } from "../natives/input";
import { Label } from "../natives/label";
import { Slider } from "../natives/slider";

interface NumberInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
  }
  
  export function NumberInput({
    label,
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    unit = '',
  }: NumberInputProps) {
    return (
      <div className="space-y-2">
        <Label className="text-white">{label}</Label>
        <div className="flex items-center gap-2 text-white">
          <Input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            min={min}
            max={max}
            step={step}
            className="w-20"
          />
          {unit && <span className="text-sm text-muted">{unit}</span>}
          <Slider
            value={[value]}
            onValueChange={([v]) => onChange(v)}
            min={min}
            max={max}
            step={step}
            className="flex-1"
          />
        </div>
      </div>
    );
  }