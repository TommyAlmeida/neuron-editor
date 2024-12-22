import { Lightbulb, Cone } from "lucide-react";
import { NeuronLight } from "../../types/light";
import { Html } from "@react-three/drei";
import { useMemo } from "react";

const iconMap = {
    point: Lightbulb,
    spot: Cone,
} as const;

export const LightGizmo = ({ light, selected }: { light: NeuronLight, selected: boolean }) => {
    const IconComponent = iconMap[light.type];

    const containerStyle = useMemo(() => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: selected ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.5)',
        borderRadius: '50%',
        padding: '0.5rem',
        width: '40px',
        height: '40px',
        boxShadow: selected ? '0px 0px 10px rgba(255, 255, 255, 0.8)' : 'none',
    }), [selected]);

    if (!IconComponent) return null;

    return <Html position={light.position} center renderOrder={1}>
        <div style={containerStyle}>
            <IconComponent
                size={32}
                color={light.color}
                className={light.type === 'spot' ? '-rotate-45' : ''}
            />
        </div>
    </Html>
}