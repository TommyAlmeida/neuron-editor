import { Checkbox as HeadlessCheckbox } from "@headlessui/react";
interface CheckboxProps {
    label: string;
    checked: boolean | undefined;
    onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
    return (
        <label className="flex items-center gap-2">
            <span className="text-sm text-gray-400">{label}</span>
            <HeadlessCheckbox
                checked={checked}
                className="border-neutral-600 rounded-full group block size-4 p-0.5 outline-none border bg-neutral-800 data-[checked]:bg-blue-500"
                onChange={onChange}
            >

                <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                    <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </HeadlessCheckbox>
        </label>
    );
};
