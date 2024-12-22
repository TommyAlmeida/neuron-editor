import { Vector3d } from "./geometry"
import { SceneItem } from "./scene";

export type LightType = "point" | "spot";

export interface NeuronLight extends SceneItem {
    type: LightType,
    color: string,
    intensity: number
    position: Vector3d
}