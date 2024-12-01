export interface AxisChangeHandler {
    (axis: 'x' | 'y' | 'z', value: number): void;
}

export interface Vector3Input {
    label: string;
    values: [number, number, number];
    onChange: AxisChangeHandler;
}
