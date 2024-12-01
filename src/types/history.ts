import { EditorState } from "./editor";

export interface HistoryState {
    past: EditorState[];
    present: EditorState | null;
    future: EditorState[];
  }
  
  export interface HistoryAction {
    type: 'UNDO' | 'REDO' | 'PUSH';
    payload?: EditorState;
  }