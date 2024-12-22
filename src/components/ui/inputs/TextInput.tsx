import { Input } from "../natives/input";
import { Label } from "../natives/label";

interface TextInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  }
  
  export function TextInput({
    label,
    value,
    onChange,
    placeholder,
  }: TextInputProps) {
    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full"
        />
      </div>
    );
  }