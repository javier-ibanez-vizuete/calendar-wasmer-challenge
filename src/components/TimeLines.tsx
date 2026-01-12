import classNames from "classnames";
import { useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { generateTimeLines } from "../utils/timeGrid";

const baseTimeLinesConfig = "absolute inset-0 pointer-events-none";

export function TimeLines() {
    const { theme } = useTheme();

    const timeLines = useMemo(() => generateTimeLines(), []);

    const baseLineClasses = useMemo(
        () =>
            classNames("absolute border-b w-full left-0", {
                "border-accent-background-dark/20": theme === "light",
                "border-accent-background/20": theme !== "light",
            }),
        [theme]
    );

    return (
        <div className={baseTimeLinesConfig} aria-hidden="true">
            {timeLines.map((line) => (
                <div
                    key={`line-${line.top}`}
                    className={baseLineClasses}
                    style={{
                        top: `${line.top}px`,
                        borderBottomStyle: line.isHour ? "solid" : "dashed",
                    }}
                />
            ))}
        </div>
    );
}
