import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "@radix-ui/react-separator";
import { useSceneStore } from "../../../store/useSceneStore";
import { NeuronLight } from "../../../types/light";
import { ColorInput } from "../inputs/ColorInput";
import { NumberInput } from "../inputs/NumberInput";
import { Vector3Input } from "../inputs/Vector3Input";
import { Panel } from "./Panel";

const LIGHT_PRESETS = {
    warm: { color: '#ff7a00', intensity: 1, temperature: 2700 },
    cool: { color: '#00b3ff', intensity: 1, temperature: 6500 },
    natural: { color: '#ffd1b3', intensity: 0.8, temperature: 4000 },
    studio: { color: '#ffffff', intensity: 1.2, temperature: 5600 },
};


export function LightPanel() {
    const { lights, selectedObjectId, updateLight } = useSceneStore();
    const selectedLight = lights.find(light => light.id === selectedObjectId);

    if (!selectedLight) return null;

    const handleUpdate = (updates: Partial<NeuronLight>) => {
        updateLight(selectedLight.id, updates);
    };

    return (
        <Panel
            config={{
                id: 'light',
                title: 'Light Properties',
                position: 'right',
                size: { width: 300 },
            }}
        >
            <ScrollArea className="h-auto">
                <div className="grid grid-cols-2 gap-2 mb-2">
                    {Object.entries(LIGHT_PRESETS).map(([name, preset]) => (
                        <button
                            key={name}
                            className="px-3 py-2 bg-neutral-800 text-gray-400 rounded-md text-sm"
                            onClick={() => handleUpdate(preset)}
                        >
                            {name}
                        </button>
                    ))}
                </div>


                <div className="space-y-6 p-2">
                    <ColorInput
                        label="Color"
                        value={selectedLight.color}
                        onChange={(color) => handleUpdate({ color })}
                    />
                    <Separator />
                    <NumberInput
                        label="Intensity"
                        value={selectedLight.intensity}
                        onChange={(intensity) => handleUpdate({ intensity })}
                        min={0}
                        max={10}
                        step={0.1}
                    />
                    <Separator />
                    <Vector3Input
                        label="Position"
                        value={selectedLight.position}
                        onChange={(position) => handleUpdate({ position })}
                        step={0.1}
                    />

                    {/* Specific controls based on light type */}
                    {(selectedLight.type === 'point' || selectedLight.type === 'spot') && (
                        <>
                            <Separator />
                            <NumberInput
                                label="Distance"
                                value={selectedLight.distance ?? 0}
                                onChange={(distance) => handleUpdate({ distance })}
                                min={0}
                                max={100}
                                step={0.1}
                            />
                            <NumberInput
                                label="Decay"
                                value={selectedLight.decay ?? 1}
                                onChange={(decay) => handleUpdate({ decay })}
                                min={0}
                                max={2}
                                step={0.1}
                            />
                        </>
                    )}

                    {selectedLight.type === 'spot' && (
                        <>
                            <Separator />
                            <NumberInput
                                label="Angle"
                                value={selectedLight.angle ?? 0.5}
                                onChange={(angle) => handleUpdate({ angle })}
                                min={0}
                                max={Math.PI / 2}
                                step={0.1}
                            />
                            <NumberInput
                                label="Penumbra"
                                value={selectedLight.penumbra ?? 0}
                                onChange={(penumbra) => handleUpdate({ penumbra })}
                                min={0}
                                max={1}
                                step={0.1}
                            />
                        </>
                    )}
                </div>
            </ScrollArea>
        </Panel>
    );
}