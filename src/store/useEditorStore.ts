import { create } from "zustand"

interface EditorState {
    transformMode: "translate" | "rotate" | "scale"
    setTransformMode: (mode: "translate" | "rotate" | "scale") => void
}

export const useEditorStore = create<EditorState>((set) => ({
    transformMode: "translate",
    setTransformMode: (mode) => set({ transformMode: mode })
}))