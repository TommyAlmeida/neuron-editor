import { useEffect } from "react";
import { useHistoryStore } from "../store/historyStore";
import { useEditorStore } from "../store/editorStore";

export const useKeyboardShortcuts = () => {
    const { undo, redo } = useHistoryStore();
    const {deleteObject} = useEditorStore();
    
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.metaKey || e.ctrlKey) {
          if (e.key === 'z') {
            e.preventDefault();
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
          }
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [undo, redo]);
  };