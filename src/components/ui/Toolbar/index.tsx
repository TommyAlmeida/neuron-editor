import { Box, Cone, Cylinder, DotIcon, Import, Lightbulb, Move3D, Rotate3D, Save, Scale3D, Torus } from "lucide-react"
import { useSceneStore } from "../../../store/useSceneStore";
import { GeometryType } from "../../../types/geometry";
import { useEditorStore } from "../../../store/useEditorStore";
import { ToolbarButton } from "./ToolbarButton";

export const Toolbar = () => {
    const { setGeometry, save, load, addLight } = useSceneStore();
    const { transformMode, setTransformMode } = useEditorStore();

    const tools = [
        {
            icon: <Move3D className="w-4 h-4 text-sm" />,
            title: 'Move',
            onClick: () => { setTransformMode("translate") },
            active: transformMode === "translate"
        },
        {
            icon: <Rotate3D className="w-4 h-4 text-sm" />,
            title: 'Rotate',
            onClick: () => { setTransformMode("rotate") },
            active: transformMode === "rotate"
        },
        {
            icon: <Scale3D className="w-4 h-4 text-sm" />,
            title: 'Scale',
            onClick: () => { setTransformMode("scale") },
            active: transformMode === "scale"
        },
        {
            icon: <Box className="w-4 h-4 text-sm" />,
            title: 'Box',
            onClick: () => { setGeometry(GeometryType.Box) },
        },
        {
            icon: <Cylinder className="w-4 h-4 text-sm" />,
            title: 'Cylinder',
            onClick: () => { setGeometry(GeometryType.Cylinder) },
        },
        {
            icon: <Torus className="w-4 h-4 text-sm" />,
            title: 'Torus',
            onClick: () => { setGeometry(GeometryType.Torus) },
        },
        {
            icon: <Cone className="w-4 h-4 text-sm -rotate-45" />,
            title: 'Directional Light',
            onClick: () => { addLight("directional") },
        },
        {
            icon: <Lightbulb className="w-4 h-4 text-sm -rotate-45" />,
            title: 'SpotLight',
            onClick: () => { addLight("spot") },
        },
        {
            icon: <DotIcon className="w-4 h-4 text-sm -rotate-45" />,
            title: 'Point Light',
            onClick: () => { addLight("point") },
        },
        {
            icon: <Save className="w-4 h-4 text-sm" />,
            title: 'Save',
            onClick: () => { save() },
        },
        {
            icon: <Import className="w-4 h-4 text-sm" />,
            title: 'Load',
            onClick: () => { load() },
        },
    ]

    return (
        <div className="absolute top-4 right-1/2 translate-x-1/2">
            <div className="flex justify-center flex-row w-auto p-2 gap-4 rounded-xl shadow bg-neutral-900">
                {tools.map((tool) => (
                    <ToolbarButton
                        key={tool.title}
                        icon={tool.icon}
                        title={tool.title}
                        onClick={tool.onClick}
                        active={tool.active}
                    />
                ))}
            </div>
        </div>
    )
}