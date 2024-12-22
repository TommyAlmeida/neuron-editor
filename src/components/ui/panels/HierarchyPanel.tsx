import { Panel } from "./Panel"
import { Box, Lightbulb } from "lucide-react";
import { useSceneStore } from "../../../store/useSceneStore";
import { TransformPanel } from "./TransformPanel";
import { ScrollArea } from "../natives/scroll-area";
export function HierarchyPanel() {
    const { objects, lights, selectedObjectId, selectObject } = useSceneStore();

    const allObjects = [...objects, ...lights];

    const handleClick = (e: React.MouseEvent, objectId: string) => {
        e.stopPropagation();
        selectObject(objectId)
    }

    const getIcon = (object: any) => {
        if ('intensity' in object) {
            return <Lightbulb className="w-4 h-4 mr-2" />;
        }
        return <Box className="w-4 h-4 mr-2" />;
    };


    return (
        <div className="absolute top-4 right-4 bottom-px space-y-10">
            <Panel config={
                {
                    id: 'hierarchy',
                    title: 'Hierarchy',
                    position: 'left',
                    size: { width: 300 },
                }
            }>
                <ScrollArea className="h-auto">
                    {allObjects.map((object) => (
                        <div
                            key={object.id}
                            className={`text-white border 
                        ${selectedObjectId === object.id ? 'border-blue-500' : 'border-transparent'} rounded-md m-2`
                            }
                            onClick={(e) => handleClick(e, object.id)}
                        >
                            <p className="text-xs inline-flex align-middle p-2 gap-2 font-semibold">
                                {getIcon(object)} {object.name}
                            </p>
                        </div>
                    ))}
                </ScrollArea>
            </Panel>

            {selectedObjectId && (
                <TransformPanel onUpdate={() => { }} />
            )}
        </div>
    )
}