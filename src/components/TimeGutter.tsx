import { useMemo } from "react";
import { CONTAINER_HEIGHT } from "../utils/constants";
import { generateTimeGrid } from "../utils/timeGrid";

/**
 * Renders the vertical time axis (gutter) displaying time labels.
 *
 * This component generates a list of time slots (e.g., 9:00, 9:30) using the
 * `generateTimeGrid` utility and renders them vertically. Each label is absolutely
 * positioned to align perfectly with the corresponding grid lines in the main
 * Calendar component.
 *
 * It handles the formatting of the time text, including conditional rendering
 * of the AM/PM suffix for full hours.
 *
 * @component
 * @returns {JSX.Element} A div containing the list of time labels.
 */
export function TimeGutter() {
    const timeSlots = useMemo(() => generateTimeGrid(), []);

    const baseTimeGutterConfig = "relative w-20";
    const styleTimeGutterConfig = useMemo(
        () => ({
            height: `${CONTAINER_HEIGHT}px`,
        }),
        []
    );

    const baseSlotConfig = "absolute -translate-y-1/2 right-2";

    return (
        <div className={baseTimeGutterConfig} style={styleTimeGutterConfig}>
            {timeSlots.map((slot) => (
                <p
                    key={`${slot.timeLabel}-${slot.formatLabel}`}
                    className={baseSlotConfig}
                    style={{ top: `${slot.top}px` }}
                >
                    {slot.timeLabel}
                    <small className="ml-0.5">{slot.isHour && slot.formatLabel}</small>
                </p>
            ))}
        </div>
    );
}
