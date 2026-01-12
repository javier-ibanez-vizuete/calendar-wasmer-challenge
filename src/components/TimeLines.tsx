import classNames from "classnames";
import { useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { generateTimeLines } from "../utils/timeGrid";

/**
 * Renders the horizontal background grid lines for the calendar.
 * * This component acts as a visual guide, drawing a line every 30 minutes.
 * It is intended to be placed as the first child of the Calendar container
 * so that events are rendered on top of it.
 */
export function TimeLines() {
    const { theme } = useTheme();
    const timeLines = useMemo(() => generateTimeLines(), []);

    const baseTimeLinesConfig = "absolute inset-0 pointer-events-none";

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
