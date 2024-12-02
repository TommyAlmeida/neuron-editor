import {Vector3D} from "./math.ts";
import {LightType} from "./editor.ts";

type GeometryType = 'box' | 'sphere' | 'cylinder' | 'plane';
type MaterialType = 'standard' | 'basic' | 'phong' | 'physical';

interface SceneItem {
    id: string;
    parentId: string | null;
}

interface Light extends SceneItem {
    type: LightType;
    name: string;
    intensity: number;
    color: string;
    position: Vector3D;
    angle: number;
}

interface SceneObject extends SceneItem {
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

export type {
    GeometryType,
    MaterialType,

    Light,
    SceneObject,
};
