import { useMemo } from "react";
import { CONTAINER_HEIGHT } from "../utils/constants";
import { generateTimeGrid } from "../utils/timeGrid";

const baseTimeGutterConfig = "relative w-20";

const baseSlotConfig = "absolute -translate-y-1/2 right-2 text-md";

export function TimeGutter() {
    const timeSlots = useMemo(() => generateTimeGrid(), []);

    const styleTimeGutterConfig = useMemo(
        () => ({
            height: `${CONTAINER_HEIGHT}px`,
        }),
        []
    );

    return (
        <div className={baseTimeGutterConfig} style={styleTimeGutterConfig}>
            {timeSlots.map((slot) => (
                <p
                    key={`${slot.timeLabel}-${slot.formatLabel}`}
                    className={baseSlotConfig}
                    style={{ top: `${slot.top}px`, opacity: `${!slot.isHour ? "50" : "100"}%` }}
                >
                    {slot.timeLabel}
                    <small className="ml-1 text-xs font-extralight opacity-50">
                        {slot.isHour && slot.formatLabel}
                    </small>
                </p>
            ))}
        </div>
    );
}
