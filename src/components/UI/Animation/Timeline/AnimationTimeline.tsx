import { useCallback, useMemo, useRef } from "react";
import { useAnimationStore } from "../../../../store/animationStore";
import { useStore } from "../../../../store/editorStore";
import { Circle, Pause, Play } from "lucide-react";
import { motion } from "framer-motion";

export const AnimationTimeline = () => {
  const {
    animations,
    currentTime,
    duration,
    isPlaying,
    fps,
    selectedKeyframe,
    play,
    pause,
    seek,
    addKeyframe,
    selectKeyframe,
  } = useAnimationStore();

  const { selectedId, settings } = useStore();
  const timelineRef = useRef<HTMLDivElement>(null);

  const selectedAnimation = useMemo(() =>
    animations.find(a => a.objectId === selectedId),
    [animations, selectedId]
  );

  const timeToX = useCallback((time: number) => {
    const width = timelineRef.current?.clientWidth ?? 0;
    return (time / duration) * width;
  }, [duration]);

  const xToTime = useCallback((x: number) => {
    const width = timelineRef.current?.clientWidth ?? 0;
    return (x / width) * duration;
  }, [duration]);

  const handleTimelineClick = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    seek(xToTime(x));
  };

  const handleAddKeyframe = () => {
    if (!selectedAnimation || !selectedId) return;

    const selectedObject = useStore.getState().objects.find(o => o.id === selectedId);
    if (!selectedObject) return;


  };

  return settings.timelineEnabled && (
    <motion.div
      className="absolute rounded-lg bottom-2 left-2 right-2 z-[100] bg-neutral-900 border-t border-neutral-800">
      <div className="flex items-center gap-2 p-2 border-b border-neutral-800">
        <button
          onClick={isPlaying ? pause : play}
          className="px-1 py-1 bg-neutral-700 hover:bg-neutral-600 rounded-full disabled:opacity-50"
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-blue-600" /> : <Play className="w-5 h-5 fill-green-500" />}
        </button>
        <button
          onClick={handleAddKeyframe}
          disabled={!selectedAnimation}
          className="px-1 py-1 bg-neutral-700 hover:bg-neutral-600 rounded-full disabled:opacity-50"
        >
          <Circle className="w-5 h-5 fill-red-500 hover:fill-red-600" />
        </button>
        <div className="text-neutral-300 text-sm">
          {Math.floor(currentTime * fps)}/{Math.floor(duration * fps)} frames
        </div>
      </div>

      <div className="h-6 border-b border-neutral-800 relative">
        {Array.from({ length: Math.floor(duration * fps) }).map((_, i) => (
          <div
            key={i}
            className="absolute h-2 border-l border-neutral-700"
            style={{ left: timeToX(i / fps) }}
          />
        ))}
      </div>

      <div
        ref={timelineRef}
        className="relative h-32 overflow-y-auto"
        onClick={handleTimelineClick}
      >
        <div
          className="absolute top-0 bottom-0 w-px bg-red-500 pointer-events-none"
          style={{ left: timeToX(currentTime) }}
        />

        {selectedAnimation?.keyframes.map(keyframe => (
          <div
            key={keyframe.id}
            className={`absolute w-3 h-3 -ml-1.5 rounded-full cursor-pointer
                ${selectedKeyframe === keyframe.id ? 'bg-blue-500' : 'bg-yellow-500'}`}
            style={{ left: timeToX(keyframe.time) }}
            onClick={(e) => {
              e.stopPropagation();
              selectKeyframe(keyframe.id);
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};
