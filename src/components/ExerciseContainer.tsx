import { type ReactNode } from "react";

type ExerciseContainerProps = {
    children: ReactNode;
};

const baseExerciseContainerConfig = "flex p-3 rounded-md";

export function ExerciseContainer({ children }: ExerciseContainerProps) {
    return <main className={baseExerciseContainerConfig}>{children}</main>;
}
