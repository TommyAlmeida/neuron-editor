import { create } from "zustand"

type TransformMode = "translate" | "rotate" | "scale"

interface EditorState {
    transformMode: TransformMode
    setTransformMode: (mode: TransformMode) => void
    isTransforming: boolean
    setIsTransforming: (isTransforming: boolean) => void
}

export const useEditorStore = create<EditorState>((set) => ({
    transformMode: "translate",
    isTransforming: false,
    setTransformMode: (mode) => set({ transformMode: mode }),
    setIsTransforming: (isTransforming) => set({ isTransforming })
}))