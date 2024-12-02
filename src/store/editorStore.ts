import { create } from 'zustand';
import { EditorState, EditorSettings } from '../types/editor';
import { Vector3D } from '../types/math';
import {GeometryType, Light, MaterialType, SceneObject} from "../types/scene.ts";
import {EditorNotification} from "../types/notification.ts";

const DEFAULT_SETTINGS: EditorSettings = {
  theme: 'light',
  gridEnabled: true,
  gridSize: 1,
  snapToGrid: false,
  snapValue: 1,
};

export const useEditorStore = create<EditorState>((set, get) => ({
  objects: [],
  lights: [],
  gizmoMode: 'translate',
  selectedId: null,
  selectedGeometry: null,
  settings: DEFAULT_SETTINGS,
  groups: [],
  notifications: [],

  setGizmoMode: (mode) => set({ gizmoMode: mode }),
  setGeometry: (geometry) => set({ selectedGeometry: geometry }),

  addObject: (type: GeometryType) => {
    const state = get();
    if (state.objects.length >= 100) {
      get().addNotification({
        message: 'Maximum object limit reached',
        type: 'error'
      });
      return;
    }

    const newObject: SceneObject = {
      id: crypto.randomUUID(),
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${state.objects.length + 1}`,
      position: [0, 0, 0] as Vector3D,
      rotation: [0, 0, 0] as Vector3D,
      scale: [1, 1, 1] as Vector3D,
      color: '#4f46e5',
      parentId: null,
      material: {
        type: "standard" as MaterialType,
        metalness: 0.5,
        roughness: 0.5,
        wireframe: false,
        color: '#4f46e5',
        transparent: false,
        opacity: 1,
      },
    };

    set((state) => ({
      objects: [...state.objects, newObject],
      selectedGeometry: null
    }));

    get().addNotification({
      message: `Added new ${type}`,
      type: 'success'
    });
  },


  addLight: (type) => {
    const newLight: Light = {
      id: crypto.randomUUID(),
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Light ${get().lights.length + 1}`,
      intensity: 1,
      color: '#ffffff',
      position: [0, 5, 0] as Vector3D,
      angle: 0,
      parentId: null,
    };

    set((state) => ({
      lights: [...state.lights, newLight]
    }));

    get().addNotification({
      message: `Added new ${type.charAt(0).toUpperCase() + type.slice(1)} light!`,
      type: 'success',
    });
  },

  addNotification: (notification: EditorNotification) => {
    const id = crypto.randomUUID();
    set((state) => ({
      notifications: [...state.notifications, { ...notification, id }]
    }));

    setTimeout(() => {
      get().removeNotification(id);
    }, 5000);
  },

  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((notif) => notif.id !== id)
    }));
  },

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

  save: () => {
    const state = get();
    const stateToSave = {
      objects: state.objects,
      lights: state.lights,
      settings: state.settings,
      groups: state.groups,
    };

    console.log('stateToSave', stateToSave);
    state.addNotification({ id: crypto.randomUUID(), message: 'Saved state to local storage!', type: 'success' });
    localStorage.setItem('editorState', JSON.stringify(stateToSave));
  },

  load: () => {
    const savedState = localStorage.getItem('editorState');

    if (savedState) {
      const parsedState = JSON.parse(savedState);

      set({
        objects: parsedState.objects || [],
        lights: parsedState.lights || [],
        settings: parsedState.settings || DEFAULT_SETTINGS,
        groups: parsedState.groups || [],
      });

      console.log('Loaded state:', parsedState);
    } else {
      console.warn('No saved state found in localStorage.');
    }
  },
}));
