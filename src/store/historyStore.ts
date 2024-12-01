import { create } from 'zustand';
import { produce } from 'immer';
import { HistoryState } from '../types/history';
import { EditorState } from '../types/editor';

interface HistoryStore {
  history: HistoryState;
  canUndo: boolean;
  canRedo: boolean;
  push: (state: EditorState) => void;
  undo: () => void;
  redo: () => void;
  clear: () => void;
}

export const useHistoryStore = create<HistoryStore>((set) => ({
  history: {
    past: [],
    present: null,
    future: [],
  },
  canUndo: false,
  canRedo: false,

  push: (newState) => set(
    produce((state) => {
      state.history.past.push(state.history.present);
      state.history.present = newState;
      state.history.future = [];
      state.canUndo = true;
      state.canRedo = false;
    })
  ),

  undo: () => set(
    produce((state) => {
      if (state.history.past.length === 0) return;

      const previous = state.history.past.pop()!;
      state.history.future.unshift(state.history.present);
      state.history.present = previous;
      state.canUndo = state.history.past.length > 0;
      state.canRedo = true;
    })
  ),

  redo: () => set(
    produce((state) => {
      if (state.history.future.length === 0) return;

      const next = state.history.future.shift()!;
      state.history.past.push(state.history.present);
      state.history.present = next;
      state.canUndo = true;
      state.canRedo = state.history.future.length > 0;
    })
  ),

  clear: () => set({
    history: {
      past: [],
      present: null,
      future: [],
    },
    canUndo: false,
    canRedo: false,
  }),
}));