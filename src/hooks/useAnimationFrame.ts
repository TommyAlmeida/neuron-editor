import { useFrame } from "@react-three/fiber";
import { useAnimationStore } from "../store/animationStore";

export const useAnimationFrame = () => {
  const { isPlaying, currentTime, duration, seek } = useAnimationStore();

  useFrame((_, delta) => {
    if (isPlaying) {
      const newTime = currentTime + delta;
      if (newTime >= duration) {
        seek(0);
      } else {
        seek(newTime);
      }
    }
  });
};
