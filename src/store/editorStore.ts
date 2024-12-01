import { create } from 'zustand';
import { Object3D, EditorState, Light, EditorSettings } from '../types/editor';

const DEFAULT_SETTINGS: EditorSettings = {
  theme: 'light',
  gridEnabled: true,
  gridSize: 1,
  snapToGrid: false,
  snapValue: 1,
};

export const useStore = create<EditorState>((set) => ({
  objects: [],
  lights: [],
  gizmoMode: 'translate',
  selectedId: null,
  selectedGeometry: null,
  settings: DEFAULT_SETTINGS,
  groups: [],

  setGizmoMode: (mode) => set({ gizmoMode: mode }),
  setGeometry: (geometry) => set({ selectedGeometry: geometry }),
  
  addObject: (type) => set((state) => {
    const newObject: Object3D = {
      id: crypto.randomUUID(),
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${state.objects.length + 1}`,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#4f46e5',
      parentId: null,
      material: {
        type: 'standard',
        metalness: 0.5,
        roughness: 0.5,
        wireframe: false,
        color: '#4f46e5',
        transparent: false,
        opacity: 1,
      },
    };

    return { objects: [...state.objects, newObject] };
  }),

  addLight: (type) => set((state) => {
    const newLight: Light = {
      id: crypto.randomUUID(),
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Light ${state.lights.length + 1}`,
      intensity: 1,
      color: '#ffffff',
      position: [5, 5, 5],
      angle: 0,
      parentId: null,
    };
    return { lights: [...state.lights, newLight] };
  }),
  
  selectObject: (id) => set({ selectedId: id }),
  
  updateObject: (id, updates) => set((state) => ({
    objects: state.objects.map((obj) =>
      obj.id === id ? { ...obj, ...updates } : obj
    ),
  })),

  updateObjects: (objects: any) => set({ objects }),

  updateLight: (id, updates) => set((state) => ({
    lights: state.lights.map((light) =>
      light.id === id ? { ...light, ...updates } : light
    ),
  })),

  updateLights: (lights: any) => set({ lights }),

  updateSettings: (settings) => set((state) => ({
    settings: { ...state.settings, ...settings },
  })),

  deleteObject: (id) => set((state) => ({
    objects: state.objects.filter((obj) => obj.id !== id),
    selectedId: state.selectedId === id ? null : state.selectedId,
  })),

  deleteLight: (id) => set((state) => ({
    lights: state.lights.filter((light) => light.id !== id),
    selectedId: state.selectedId === id ? null : state.selectedId,
  })),

  
  addGroup: () => set((state) => ({
    groups: [
      ...state.groups,
      {
        id: crypto.randomUUID(),
        name: `Group ${state.groups.length + 1}`,
        isOpen: true,
      },
    ],
  })),

  updateGroup: (id, updates) => set((state) => ({
    groups: state.groups.map((group) =>
      group.id === id ? { ...group, ...updates } : group
    ),
  })),

  deleteGroup: (id) => set((state) => {
    // Move all items in the group back to root
    const updatedObjects = state.objects.map(obj =>
      obj.parentId === id ? { ...obj, parentId: null } : obj
    );
    const updatedLights = state.lights.map(light =>
      light.parentId === id ? { ...light, parentId: null } : light
    );

    return {
      groups: state.groups.filter((group) => group.id !== id),
      objects: updatedObjects,
      lights: updatedLights,
    };
  }),

  moveItem: (itemId, parentId) => set((state) => {
    const updatedObjects = state.objects.map(obj =>
      obj.id === itemId ? { ...obj, parentId } : obj
    );
    const updatedLights = state.lights.map(light =>
      light.id === itemId ? { ...light, parentId } : light
    );

    return {
      objects: updatedObjects,
      lights: updatedLights,
    };
  }),
}));