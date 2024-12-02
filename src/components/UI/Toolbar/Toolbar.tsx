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
  Upload, Globe,
} from 'lucide-react';
import { useEditorStore } from '../../../store/editorStore.ts';
import {GizmoMode, LightType} from '../../../types/editor.ts';
import { SettingsPanel } from '../Panels/SettingsPanel.tsx';
import { useState } from 'react';
import { ToolbarButton } from './ToolbarButton.tsx';
import { ToolbarDivider } from './ToolbarDivider.tsx';
import {GeometryType} from "../../../types/scene.ts";

type ButtonConfig<T> = {
  type: T;
  icon: JSX.Element;
  title: string;
};

const createButtons = <T,>(buttons: ButtonConfig<T>[], handleClick: (type: T) => void) =>
    buttons.map(({ type, icon, title }) => (
        <ToolbarButton key={String(type)} icon={icon} onClick={() => handleClick(type)} title={title} />
    ));

export function Toolbar() {
  const { setGeometry, addLight, settings, updateSettings, setGizmoMode, save, load } = useEditorStore();
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const baseIconClass = "w-5 h-5 align-center items-center text-gray-200";

  const transformButtons: ButtonConfig<GizmoMode>[] = [
    { type: 'translate', icon: <Move3D className={baseIconClass} />, title: 'Translate' },
    { type: 'rotate', icon: <Rotate3D className={baseIconClass} />, title: 'Rotate' },
    { type: 'scale', icon: <Scale3D className={baseIconClass} />, title: 'Scale' },
  ];

  const shapeButtons: ButtonConfig<GeometryType>[] = [
    { type: 'box', icon: <Box className={baseIconClass} />, title: 'Cube' },
    { type: 'sphere', icon: <Circle className={baseIconClass} />, title: 'Sphere' },
    { type: 'plane', icon: <Square className={baseIconClass} />, title: 'Plane' },
    { type: 'cylinder', icon: <Cylinder className={baseIconClass} />, title: 'Cylinder' },
  ];

  const lightButtons: ButtonConfig<LightType>[] = [
    { type: 'ambient', icon: <Sun className={baseIconClass} />, title: 'Ambient Light' },
    { type: 'point', icon: <Lightbulb className={baseIconClass} />, title: 'Point Light' },
    { type: 'spot', icon: <Cone className={`${baseIconClass} -rotate-45`} />, title: 'Spot Light' },
  ];

  const utilityButtons: ButtonConfig<string>[] = [
    { type: 'grid', icon: <Grid className={baseIconClass} />, title: 'Toggle Grid' },
    { type: 'snap', icon: <Camera className={baseIconClass} />, title: 'Toggle Snap to Grid' },
    { type: 'settings', icon: <SettingsIcon className={baseIconClass} />, title: 'Settings' },
    { type: 'environmentSettings', icon: <Globe className={baseIconClass} />, title: 'Environment Settings' },
    { type: 'save', icon: <Save className={baseIconClass} />, title: 'Save' },
    { type: 'load', icon: <Upload className={baseIconClass} />, title: 'Load' },
  ];

  const handleToolClick = (mode: GizmoMode) => setGizmoMode(mode);
  const handleShapeClick = (type: GeometryType) => setGeometry(type);
  const handleLightClick = (type: LightType) => addLight(type);
  const handleUtilityClick = (type: string) => {
    switch (type) {
      case 'grid':
        updateSettings({ gridEnabled: !settings.gridEnabled });
        break;
      case 'snap':
        updateSettings({ snapToGrid: !settings.snapToGrid });
        break;
      case 'settings':
        setSettingsOpen(!isSettingsOpen);
        break;
      case 'save':
        save('cache');
        break;
      case 'load':
        load('cache');
        break;
    }
  };

  return (
      <>
        <div className="absolute top-4 left-2 bg-neutral-900 rounded-md shadow-lg p-1.5 flex flex-col z-50">
          {createButtons(transformButtons, handleToolClick)}
          <ToolbarDivider />
          {createButtons(shapeButtons, handleShapeClick)}
          <ToolbarDivider />
          {createButtons(lightButtons, handleLightClick)}
          <ToolbarDivider />
          {createButtons(utilityButtons, handleUtilityClick)}
        </div>
        <SettingsPanel isOpen={isSettingsOpen} />
      </>
  );
}