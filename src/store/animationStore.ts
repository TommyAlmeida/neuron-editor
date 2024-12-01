import { create } from 'zustand';
import { produce } from 'immer';
import { EditorAnimation } from '../types/animation';

interface AnimationStore {
    animations: EditorAnimation[];
    currentTime: number;
    isPlaying: boolean;
    fps: number;
    duration: number;
    selectedKeyframe: string | null;

    addAnimation: (objectId: string) => void;
    removeAnimation: (id: string) => void;
    addKeyframe: (animationId: string, time: number, properties: Keyframe['properties']) => void;
    removeKeyframe: (animationId: string, keyframeId: string) => void;
    updateKeyframe: (animationId: string, keyframeId: string, properties: Partial<Keyframe>) => void;
    selectKeyframe: (id: string | null) => void;
    play: () => void;
    pause: () => void;
    stop: () => void;
    seek: (time: number) => void;
    setDuration: (duration: number) => void;
    setFPS: (fps: number) => void;
}

export const useAnimationStore = create<AnimationStore>((set) => ({
    animations: [],
    currentTime: 0,
    isPlaying: false,
    fps: 30,
    duration: 5, // 5 seconds default
    selectedKeyframe: null,

    addAnimation: (objectId) => set(produce(state => {
        state.animations.push({
            id: crypto.randomUUID(),
            objectId,
            name: `Animation ${state.animations.length + 1}`,
            duration: state.duration,
            keyframes: [],
            isPlaying: false,
            loop: false,
        });
    })),

    removeAnimation: (id) => set(produce(state => {
        state.animations = state.animations.filter((a: { id: string; }) => a.id !== id);
    })),

    addKeyframe: (animationId, time, properties) => set(produce(state => {
        const animation = state.animations.find((a: { id: string; }) => a.id === animationId);
        if (animation) {
            animation.keyframes.push({
                id: crypto.randomUUID(),
                time,
                properties,
            });
            // Sort keyframes by time
            animation.keyframes.sort((a: { time: number; }, b: { time: number; }) => a.time - b.time);
        }
    })),

    removeKeyframe: (animationId, keyframeId) => set(produce(state => {
        const animation = state.animations.find((a: { id: string; }) => a.id === animationId);
        if (animation) {
            animation.keyframes = animation.keyframes.filter((k: { id: string; }) => k.id !== keyframeId);
        }
    })),

    updateKeyframe: (animationId, keyframeId, updates) => set(produce(state => {
        const animation = state.animations.find((a: { id: string; }) => a.id === animationId);
        if (animation) {
            const keyframe = animation.keyframes.find((k: { id: string; }) => k.id === keyframeId);
            if (keyframe) {
                Object.assign(keyframe, updates);
                animation.keyframes.sort((a: { time: number; }, b: { time: number; }) => a.time - b.time);
            }
        }
    })),

    selectKeyframe: (id) => set({ selectedKeyframe: id }),

    play: () => set({ isPlaying: true }),

    pause: () => set({ isPlaying: false }),

    stop: () => set({ isPlaying: false, currentTime: 0 }),

    seek: (time) => set(state => ({
        currentTime: Math.max(0, Math.min(time, state.duration))
    })),

    setDuration: (duration) => set({ duration }),

    setFPS: (fps) => set({ fps }),
}));