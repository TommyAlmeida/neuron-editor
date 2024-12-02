import {GeometryType, Light, SceneObject} from "./scene.ts";
import {EditorNotification} from "./notification.ts";

export type LightType = 'ambient' | 'point' | 'spot';
export type Theme = 'light' | 'dark';
export type SaveType = 'file' | 'cache';

export interface Group {
  id: string;
  name: string;
  isOpen: boolean;
}

export interface EditorSettings {
  theme: Theme;
  gridEnabled: boolean;
  gridSize: number;
  snapToGrid: boolean;
  snapValue: number;
}

export type GizmoMode = 'translate' | 'rotate' | 'scale';

export interface EditorState {
  objects: SceneObject[];
  lights: Light[];
  selectedId: string | null;
  selectedGeometry: GeometryType | null;
  settings: EditorSettings;
  gizmoMode: GizmoMode;

  setGizmoMode: (mode: GizmoMode) => void;
  setGeometry: (geometry: GeometryType) => void;
  addObject: (type: GeometryType) => void;
  addLight: (type: LightType) => void;
  selectObject: (id: string | null) => void;
  updateObject: (id: string, updates: Partial<SceneObject>) => void;
  updateObjects: (objects: Partial<SceneObject[]>) => void;
  updateLight: (id: string, updates: Partial<Light>) => void;
  updateLights: (lights: Partial<Light[]>) => void;
  updateSettings: (settings: Partial<EditorSettings>) => void;
  deleteObject: (id: string) => void;
  deleteLight: (id: string) => void;

  groups: Group[];
  addGroup: () => void;
  updateGroup: (id: string, updates: Partial<Group>) => void;
  deleteGroup: (id: string) => void;
  moveItem: (itemId: string, parentId: string | null) => void;

  notifications: EditorNotification[];
  
  addNotification: (notification: EditorNotification) => void;
  removeNotification: (id: string) => void;

  save: (type: SaveType) => void;
  load: (type: SaveType) => void;
}