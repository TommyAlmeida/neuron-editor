import { memo } from 'react';
import { EditorObject } from "../../../../types/editor";
import { ColorPicker } from "../Inputs/ColorPickerSelector";
import { MaterialTypeSelector } from "../Inputs/MaterialTypeSelector";
import { Slider } from "../Inputs/Slider";
import { Checkbox } from '../Inputs/Checkbox';

export const MaterialProperties = memo(({
    material,
    onMaterialChange
}: {
    material: EditorObject['material'],
    onMaterialChange: (updates: Partial<EditorObject['material']>) => void
}) => (
    <div className="space-y-4">
        <MaterialTypeSelector
            currentType={material.type}
            onChange={(type) => onMaterialChange({ type })}
        />

        <ColorPicker
            color={material.color}
            onChange={(color) => onMaterialChange({ color })}
        />

        {material.type !== 'basic' && (
            <>
                <Slider
                    label="Metalness"
                    value={material.metalness}
                    onChange={(metalness) => onMaterialChange({ metalness })}
                />
                <Slider
                    label="Roughness"
                    value={material.roughness}
                    onChange={(roughness) => onMaterialChange({ roughness })}
                />
            </>
        )}

        <div className="flex items-center gap-4">
            <Checkbox
                label="Wireframe"
                checked={material.wireframe}
                onChange={(wireframe) => onMaterialChange({ wireframe })}
            />

            <Checkbox
                label="Transparent"
                checked={material.transparent}
                onChange={(transparent) => onMaterialChange({ transparent })}
            />
        </div>

        {material.transparent && (
            <Slider
                label="Opacity"
                value={material.opacity}
                onChange={(opacity) => onMaterialChange({ opacity })}
            />
        )}
    </div>
));

MaterialProperties.displayName = 'MaterialProperties';
