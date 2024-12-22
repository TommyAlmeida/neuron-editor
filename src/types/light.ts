import { Vector3d } from "./geometry"
import { SceneItem } from "./scene";

export type LightType = "point" | "spot" | "directional";

export interface NeuronLight extends SceneItem {
    type: LightType,
    color: string,
    intensity: number
    position: Vector3d
    distance?: number;    // Point & Spot lights
    decay?: number;        // Point & Spot lights
    angle?: number;        // Spot light
    penumbra?: number;     // Spot light
    target?: Vector3d;     // Spot & Directional lights
}