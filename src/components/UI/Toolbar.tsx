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

  return (
    <>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 flex space-x-2">
        <ToolbarButton active={gizmoMode === 'translate'} icon={<Box className="w-6 h-6 text-gray-700 dark:text-gray-200" />} onClick={() => { setGizmoMode('translate') }} title={'Translate'} />
        <ToolbarDivider />

        <ToolbarButton icon={<Box className="w-6 h-6 text-gray-700 dark:text-gray-200" />} onClick={() => { addShape('box') }} title={'Add Cube'} />
        <ToolbarButton icon={<Circle className="w-6 h-6 text-gray-700 dark:text-gray-200" />} onClick={() => { addShape('sphere') }} title={'Add Sphere'} />
        <ToolbarButton icon={<Cylinder className="w-6 h-6 text-gray-700 dark:text-gray-200" />} onClick={() => { addShape('sphere') }} title={'Add Cylinder'} />

        <ToolbarDivider />

        <ToolbarButton icon={<Sun className="w-6 h-6 text-gray-700 dark:text-gray-200" />} onClick={() => { handleAddLight('ambient') }} title={'Add Ambient Light'} />
        <ToolbarButton icon={<Lightbulb className="w-6 h-6 text-gray-700 dark:text-gray-200" />} onClick={() => { handleAddLight('point') }} title={'Add Point Light'} />
        <ToolbarButton icon={<LightbulbOff className="w-6 h-6 text-gray-700 dark:text-gray-200" />} onClick={() => { handleAddLight("spot") }} title={'Add Spot Light'} />
        <ToolbarButton icon={<LightbulbOff className="w-6 h-6 text-gray-700 dark:text-gray-200" />} onClick={() => { handleAddLight("directional") }} title={'Add Directional Light'} />

        <ToolbarDivider />

        <ToolbarButton icon={<Grid className="w-6 h-6 text-gray-700 dark:text-gray-200" />} onClick={() => { updateSettings({ gridEnabled: !settings.gridEnabled }) }}
          title={'Toggle Grid'}
        />

        <ToolbarButton icon={<Camera className="w-6 h-6 text-gray-700 dark:text-gray-200" />} onClick={() => { updateSettings({ snapToGrid: !settings.snapToGrid }) }}
          title={'Toggle Snap to Grid'}
        />

        <ToolbarDivider />

        <ToolbarButton icon={<SettingsIcon className="w-6 h-6 text-gray-700 dark:text-gray-200" />} onClick={() => { setSettingsOpen(!isSettingsOpen) }} title={'Settings'} />
        <ToolbarButton icon={<Save className="w-6 h-6 text-gray-700 dark:text-gray-200" />} onClick={() => { }} title={'Save'} />
      </div>
      <SettingsPanel isOpen={isSettingsOpen} />
    </>
  );
}