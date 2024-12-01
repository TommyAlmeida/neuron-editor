import { Outline, Select } from '@react-three/postprocessing';

interface SelectionOutlineProps {
    selectedId: string | null;
  }
  
  export function SelectionOutline({ selectedId }: SelectionOutlineProps) {
    return selectedId ? (
      <Select enabled={true}>
        <Outline
          blur
          edgeStrength={2}
          pulseSpeed={0.5}
          visibleEdgeColor={0x4f46e5}
          hiddenEdgeColor={0x4f46e5}
        />
      </Select>
    ) : null;
  }