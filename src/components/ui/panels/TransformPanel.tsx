import { Vector3Input } from '../inputs/Vector3Input';
import { useState } from 'react';
import { Panel } from './Panel';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Separator } from '@radix-ui/react-separator';

interface TransformEditorProps {
  onUpdate: (updates: {
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: [number, number, number];
  }) => void;
}

export function TransformPanel({ onUpdate }: TransformEditorProps) {
  const [transform, setTransform] = useState({
    position: [0, 0, 0] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    scale: [1, 1, 1] as [number, number, number],
  });

  const handleUpdate = <K extends keyof typeof transform>(
    key: K,
    value: typeof transform[K]
  ) => {
    setTransform(prev => ({ ...prev, [key]: value }));
    onUpdate({ [key]: value });
  };

  return (
    <Panel
      config={{
        id: 'transform',
        title: 'Transform',
        position: 'right',
        size: { width: 300 },
      }}
    >
      <ScrollArea className="h-auto">
        <div className="space-y-6 p-2">
          <Vector3Input
            label="Position"
            value={transform.position}
            onChange={(value) => handleUpdate('position', value)}
            step={0.1}
          />
          <Separator />
          <Vector3Input
            label="Rotation"
            value={transform.rotation}
            onChange={(value) => handleUpdate('rotation', value)}
            step={15}
          />
          <Separator />
          <Vector3Input
            label="Scale"
            value={transform.scale}
            onChange={(value) => handleUpdate('scale', value)}
            step={0.1}
          />
        </div>
      </ScrollArea>
    </Panel>
  );
}