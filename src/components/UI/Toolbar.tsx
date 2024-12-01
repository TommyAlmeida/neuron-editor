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
  LightbulbOff,
  Move3D,
  Rotate3D,
  Scale3D,
} from 'lucide-react';
import { useStore } from '../../store/editorStore';
import { GeometryType, LightType } from '../../types/editor';
import { SettingsPanel } from './SettingsPanel';
import { useState } from 'react';
import { ToolbarButton } from '../Toolbar/ToolbarButton';
import { ToolbarDivider } from '../Toolbar/ToolbarDivider';

export function Toolbar() {
  const { setGeometry, addLight, settings, updateSettings, setGizmoMode, gizmoMode } = useStore();

  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const addShape = (type: GeometryType) => {
    setGeometry(type);
  };

  const handleAddLight = (type: LightType) => {
    addLight(type);
  };

  const baseIconClass = "w-6 h-6 text-gray-700 dark:text-gray-200";

  return (
    <>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 flex space-x-2">
        <ToolbarButton active={gizmoMode === 'translate'} icon={<Move3D className={baseIconClass} />} onClick={() => { setGizmoMode('translate') }} title={'Translate'} />
        <ToolbarButton active={gizmoMode === 'rotate'} icon={<Rotate3D className={baseIconClass} />} onClick={() => { setGizmoMode('rotate') }} title={'Rotate'} />
        <ToolbarButton active={gizmoMode === 'scale'} icon={<Scale3D className={baseIconClass} />} onClick={() => { setGizmoMode('scale') }} title={'Scale'} />
        
        <ToolbarDivider />

        <ToolbarButton icon={<Box className={baseIconClass} />} onClick={() => { addShape('box') }} title={'Add Cube'} />
        <ToolbarButton icon={<Circle className={baseIconClass} />} onClick={() => { addShape('sphere') }} title={'Add Sphere'} />
        <ToolbarButton icon={<Cylinder className={baseIconClass} />} onClick={() => { addShape('cylinder') }} title={'Add Cylinder'} />

        <ToolbarDivider />

        <ToolbarButton icon={<Sun className={baseIconClass} />} onClick={() => { handleAddLight('ambient') }} title={'Add Ambient Light'} />
        <ToolbarButton icon={<Lightbulb className={baseIconClass} />} onClick={() => { handleAddLight('point') }} title={'Add Point Light'} />
        <ToolbarButton icon={<LightbulbOff className={baseIconClass} />} onClick={() => { handleAddLight("spot") }} title={'Add Spot Light'} />
        <ToolbarButton icon={<LightbulbOff className={baseIconClass} />} onClick={() => { handleAddLight("directional") }} title={'Add Directional Light'} />

        <ToolbarDivider />

        <ToolbarButton icon={<Grid className={baseIconClass} />} onClick={() => { updateSettings({ gridEnabled: !settings.gridEnabled }) }}
          title={'Toggle Grid'}
        />

        <ToolbarButton icon={<Camera className={baseIconClass} />} onClick={() => { updateSettings({ snapToGrid: !settings.snapToGrid }) }}
          title={'Toggle Snap to Grid'}
        />

        <ToolbarDivider />

        <ToolbarButton icon={<SettingsIcon className={baseIconClass} />} onClick={() => { setSettingsOpen(!isSettingsOpen) }} title={'Settings'} />
        <ToolbarButton icon={<Save className={baseIconClass} />} onClick={() => { }} title={'Save'} />
      </div>
      <SettingsPanel isOpen={isSettingsOpen} />
    </>
  );
}