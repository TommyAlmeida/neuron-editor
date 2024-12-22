import { GeometryType, Vector3d } from "./geometry";

export interface SceneItem {
    id: string;
    name: string,
}

export interface NeuronObject extends SceneItem {
    type: GeometryType,
    position: Vector3d,
    rotation: Vector3d,
    scale: Vector3d
}