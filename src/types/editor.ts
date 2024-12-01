export type GeometryType = 'box' | 'sphere' | 'cylinder';
export type LightType = 'ambient' | 'directional' | 'point' | 'spot';
export type Theme = 'light' | 'dark';

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
}

export interface Light extends SceneItem {
  type: LightType;
  name: string;
  intensity: number;
  color: string;
  position: [number, number, number];
}

export interface Object3D extends SceneItem {
  type: 'box' | 'sphere' | 'cylinder';
  name: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  material: {
    type: 'standard' | 'basic' | 'phong' | 'normal' | 'physical';
    metalness?: number;
    roughness?: number;
    wireframe?: boolean;
    color: string,
    transparent: boolean,
    opacity: number,
  };
}

export type GizmoMode = 'none' | 'translate' | 'rotate' | 'scale';

export interface EditorState {
  objects: Object3D[];
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
  updateObject: (id: string, updates: Partial<Object3D>) => void;
  updateObjects: (objects: Partial<Object3D[]>) => void;
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
}