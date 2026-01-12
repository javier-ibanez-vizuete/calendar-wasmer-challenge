import classNames from "classnames";
import { useMemo, type ReactNode } from "react";
import { useTheme } from "../contexts/ThemeContext";

type ExerciseContainerProps = {
    children: ReactNode;
};

export function ExerciseContainer({ children }: ExerciseContainerProps) {
    const { theme } = useTheme();

    const baseExerciseContainerConfig = useMemo(
        () =>
            classNames("flex p-3 rounded-md", {
                "bg-background": theme === "light",
                "bg-background-dark": theme !== "light",
            }),
        [theme]
    );

    return <main className={baseExerciseContainerConfig}>{children}</main>;
}
