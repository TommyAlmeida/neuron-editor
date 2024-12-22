import { create } from "zustand";
import { NeuronObject } from "../types/scene";
import { GeometryType } from "../types/geometry";
import { LightType, NeuronLight } from "../types/light";

const MAX_SCENE_OBJECTS = 100;

export interface SceneState {
    selectedObjectId: string | null;

    objects: NeuronObject[]
    lights: NeuronLight[]

    selectedGeometry: GeometryType | null;
    setGeometry: (geometry: GeometryType) => void;

    selectObject: (objectId: string | null) => void

    addObject: (type: GeometryType) => void
    removeObject: (objectId: string) => void
    updateObject: (objectId: string, object: Partial<NeuronObject>) => void

    addLight: (type: LightType) => void
    removeLight: (lightId: string) => void
    updateLight: (lightId: string, light: Partial<NeuronLight>) => void

    save: () => void
    load: () => void
}

export const useSceneStore = create<SceneState>((set, get) => ({
    selectedObjectId: null,
    selectedGeometry: null,
    objects: [],
    lights: [],

    selectObject: (objectId) => {
        set((state) => {
            if (state.selectedObjectId !== objectId) {
                return { selectedObjectId: objectId };
            }
            return state;
        });
    },

    setGeometry: (geometry) => set({ selectedGeometry: geometry }),

    addObject: (type) => {
        const state = get();

        if (state.objects.length >= MAX_SCENE_OBJECTS) {
            return;
        }

        const object: NeuronObject = {
            id: crypto.randomUUID(),
            name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${state.objects.length + 1}`,
            type,
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            scale: [1, 1, 1]
        };

        set((state) => ({ objects: [...state.objects, object] }));
    },

    removeObject: (objectId) => set((state) => ({ objects: state.objects.filter((object) => object.id !== objectId) })),
    updateObject: (objectId, object) => set((state) => ({
        objects: state.objects.map((o) => o.id === objectId ? { ...o, ...object } : o)
    })),


    addLight: (type) => {
        const state = get();

        const light: NeuronLight = {
            id: crypto.randomUUID(),
            name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${state.lights.length + 1}`,
            type,
            color: '#fff',
            intensity: 1,
            position: [0, 0, 0]
        };

        set((state) => ({ lights: [...state.lights, light] }));

        return light;
    },

    removeLight: (lightId) => set((state) => ({ lights: state.lights.filter((light) => light.id !== lightId) })),
    updateLight: (id, updates) => set((state) => ({
        lights: state.lights.map((light) =>
          light.id === id ? { ...light, ...updates } : light
        ),
      })),

    save: () => {
        const state = get();
        const stateToSave = {
            objects: state.objects,
            lights: state.lights,
        };

        console.log('stateToSave', stateToSave);
        localStorage.setItem('neuron-local-save', JSON.stringify(stateToSave));
    },
    load: () => {
        const savedState = localStorage.getItem('neuron-local-save');

        if (savedState) {
            const parsedState = JSON.parse(savedState);

            set({
                objects: parsedState.objects || [],
                lights: parsedState.lights || [],
            });

            console.log('Loaded state:', parsedState);
        } else {
            console.warn('No saved state found in localStorage.');
        }
    },
}))