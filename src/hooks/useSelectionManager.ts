import { useEffect } from 'react';
import { useSceneStore } from '../store/useSceneStore';

export function useSelectionManager() {
    const { selectObject, selectedObjectId } = useSceneStore();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                selectObject(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectObject]);

    return { selectedObjectId };
}