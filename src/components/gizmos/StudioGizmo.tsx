import { Billboard } from "@react-three/drei"

export const StudioGizmo = ({ children }: { children: React.ReactNode }) => {
    return <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
    >
        Light
    </Billboard>
}
