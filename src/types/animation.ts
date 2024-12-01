import { Vector3D } from "./math";

export interface Keyframe {
    id: string;
    time: number;
    properties: {
        position?: Vector3D;
        rotation?: Vector3D;
        scale?: Vector3D;
        color?: string;
        opacity?: number;
    };
}

export interface EditorAnimation {
    id: string;
    objectId: string;
    name: string;
    duration: number;
    keyframes: Keyframe[];
    isPlaying: boolean;
    loop: boolean;
}

export type InterpolationType = 'linear' | 'ease' | 'ease-in' | 'ease-out';
