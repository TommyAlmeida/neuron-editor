import { useAnimationStore } from '../../../store/animationStore';
import { useMemo } from 'react';
import { lerp } from 'three/src/math/MathUtils.js';
import { Vector3D } from '../../../types/math';


export const useObjectAnimation = (objectId: string) => {
    const animation = useAnimationStore(state =>
        state.animations.find(a => a.objectId === objectId)
    );
    const currentTime = useAnimationStore(state => state.currentTime);

    const interpolateProperties = useMemo(() => {
        if (!animation) return null;

        const keyframes = animation.keyframes;
        if (keyframes.length === 0) return null;

        const nextIndex = keyframes.findIndex(k => k.time > currentTime);
        if (nextIndex === -1) return keyframes[keyframes.length - 1].properties;
        if (nextIndex === 0) return keyframes[0].properties;

        const prevKeyframe = keyframes[nextIndex - 1];
        const nextKeyframe = keyframes[nextIndex];

        const alpha = (currentTime - prevKeyframe.time) /
            (nextKeyframe.time - prevKeyframe.time);

        return {
            position: prevKeyframe.properties.position && nextKeyframe.properties.position
                ? [
                    lerp(prevKeyframe.properties.position[0], nextKeyframe.properties.position[0], alpha),
                    lerp(prevKeyframe.properties.position[1], nextKeyframe.properties.position[1], alpha),
                    lerp(prevKeyframe.properties.position[2], nextKeyframe.properties.position[2], alpha),
                ] as Vector3D
                : undefined,
            rotation: prevKeyframe.properties.rotation && nextKeyframe.properties.rotation
                ? [
                    lerp(prevKeyframe.properties.rotation[0], nextKeyframe.properties.rotation[0], alpha),
                    lerp(prevKeyframe.properties.rotation[1], nextKeyframe.properties.rotation[1], alpha),
                    lerp(prevKeyframe.properties.rotation[2], nextKeyframe.properties.rotation[2], alpha),
                ] as Vector3D
                : undefined,
            scale: prevKeyframe.properties.scale && nextKeyframe.properties.scale
                ? [
                    lerp(prevKeyframe.properties.scale[0], nextKeyframe.properties.scale[0], alpha),
                    lerp(prevKeyframe.properties.scale[1], nextKeyframe.properties.scale[1], alpha),
                    lerp(prevKeyframe.properties.scale[2], nextKeyframe.properties.scale[2], alpha),
                ] as Vector3D
                : undefined,
        };
    }, [animation, currentTime]);

    return interpolateProperties;
};