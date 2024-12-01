import {
  Box,
  Cylinder,
  Save,
  Sun,
  Lightbulb,
  Grid,
  Camera,
  Settings as SettingsIcon,
  Circle,
  Move3D,
  Rotate3D,
  Scale3D,
  Cone,
  Square,
  Upload,
} from 'lucide-react';
import { useStore } from '../../store/editorStore';
import { GeometryType, LightType } from '../../types/editor';
import { SettingsPanel } from './SettingsPanel';
import { useState } from 'react';
import { ToolbarButton } from '../Toolbar/ToolbarButton';
import { ToolbarDivider } from '../Toolbar/ToolbarDivider';

export function Toolbar() {
  const { setGeometry, addLight, settings, updateSettings, setGizmoMode, gizmoMode, save, load } = useStore();
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const addShape = (type: GeometryType) => {
    setGeometry(type);
  };

  const handleAddLight = (type: LightType) => {
    addLight(type);
  };

  const baseIconClass = "w-5 h-5 align-center items-center text-gray-200";

  return (
    <>
      <div className="absolute top-2 left-2 bg-neutral-900 rounded-md shadow-lg p-1.5 flex flex-col z-50">
        <ToolbarButton active={gizmoMode === 'translate'} icon={<Move3D className={baseIconClass} />} onClick={() => { setGizmoMode('translate') }} title={'Translate'} />
        <ToolbarButton active={gizmoMode === 'rotate'} icon={<Rotate3D className={baseIconClass} />} onClick={() => { setGizmoMode('rotate') }} title={'Rotate'} />
        <ToolbarButton active={gizmoMode === 'scale'} icon={<Scale3D className={baseIconClass} />} onClick={() => { setGizmoMode('scale') }} title={'Scale'} />

        <ToolbarDivider />

        <ToolbarButton icon={<Box className={baseIconClass} />} onClick={() => { addShape('box') }} title={'Cube'} />
        <ToolbarButton icon={<Circle className={baseIconClass} />} onClick={() => { addShape('sphere') }} title={'Add Sphere'} />
        <ToolbarButton icon={<Square className={baseIconClass} />} onClick={() => { addShape('plane') }} title={'Plane'} />
        <ToolbarButton icon={<Cylinder className={baseIconClass} />} onClick={() => { addShape('cylinder') }} title={'Cylinder'} />

        <ToolbarDivider />

        <ToolbarButton icon={<Sun className={baseIconClass} />} onClick={() => { handleAddLight('ambient') }} title={'Ambient Light'} />
        <ToolbarButton icon={<Lightbulb className={baseIconClass} />} onClick={() => { handleAddLight('point') }} title={'Point Light'} />
        <ToolbarButton icon={<Cone className={`${baseIconClass} -rotate-45`} />} onClick={() => { handleAddLight("spot") }} title={'Spot Light'} />

        <ToolbarDivider />

        <ToolbarButton icon={<Grid className={baseIconClass} />} onClick={() => { updateSettings({ gridEnabled: !settings.gridEnabled }) }}
          title={'Toggle Grid'}
        />

        <ToolbarButton icon={<Camera className={baseIconClass} />} onClick={() => { updateSettings({ snapToGrid: !settings.snapToGrid }) }}
          title={'Toggle Snap to Grid'}
        />

        <ToolbarDivider />

        <ToolbarButton icon={<SettingsIcon className={baseIconClass} />} onClick={() => { setSettingsOpen(!isSettingsOpen) }} title={'Settings'} />
        <ToolbarButton icon={<Save className={baseIconClass} />} onClick={() => { save("cache") }} title={'Save'} />
        <ToolbarButton icon={<Upload className={baseIconClass} />} onClick={() => { load("cache") }} title={'Load'} />
      </div>
      <SettingsPanel isOpen={isSettingsOpen} />
    </>
  );
}