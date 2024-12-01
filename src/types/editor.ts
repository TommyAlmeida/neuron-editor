import { Vector3D } from "./math";

export type GeometryType = 'box' | 'sphere' | 'cylinder' | 'plane';
export type MaterialType = 'standard' | 'basic' | 'phong' | 'physical';
export type LightType = 'ambient' | 'point' | 'spot';
export type Theme = 'light' | 'dark';
export type SaveType = 'file' | 'cache';

export interface EditorNotification {
  id?: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface SceneItem {
  id: string;
  parentId: string | null;
}

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
  timelineEnabled: boolean;
}

export interface Light extends SceneItem {
  type: LightType;
  name: string;
  intensity: number;
  color: string;
  position: Vector3D;
  angle: number;
}

export interface EditorObject extends SceneItem {
  type: GeometryType;
  name: string;
  position: Vector3D;
  rotation: Vector3D;
  scale: Vector3D;
  color: string;
  material: {
    type: MaterialType;
    metalness?: number;
    roughness?: number;
    wireframe?: boolean;
    color: string,
    transparent: boolean,
    opacity: number,
  };
}

export type GizmoMode = 'translate' | 'rotate' | 'scale';

export interface EditorState {
  objects: EditorObject[];
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
  updateObject: (id: string, updates: Partial<EditorObject>) => void;
  updateObjects: (objects: Partial<EditorObject[]>) => void;
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