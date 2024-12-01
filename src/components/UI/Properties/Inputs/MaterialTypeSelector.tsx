import { Object3D } from "../../../../types/editor";

interface MaterialTypeSelectorProps {
    currentType: Object3D['material']['type'];
    onChange: (type: Object3D['material']['type']) => void;
}

export const MaterialTypeSelector: React.FC<MaterialTypeSelectorProps> = ({ currentType, onChange }) => {
    return (
        <select
            value={currentType}
            onChange={(e) => onChange(e.target.value as Object3D['material']['type'])}
            className="block w-full outline-none p-2.5 border-none rounded-lg text-sm text-gray-400 bg-neutral-800"
        >
            <option value="standard">Standard</option>
            <option value="basic">Basic</option>
            <option value="phong">Phong</option>
            <option value="physical">Physical</option>
        </select>
    );
};