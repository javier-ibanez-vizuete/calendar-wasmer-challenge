import { useMemo } from "react";
import type { EventProps } from "../types/component_props";
import { MAX_EVENT_WIDTH } from "../utils/constants";

/**
 * Renders a single event item within the calendar grid.
 *
 * This component calculates the exact visual position and dimensions of the event
 * based on its start time, duration, and collision group data. It uses absolute
 * positioning to place the event in the correct time slot and column, ensuring
 * it shares width proportionally if it overlaps with other events.
 *
 * @component
 * @param {EventProps} props - The component properties.
 * @param {ProcessedEvent} props.event - The processed event data containing start/end times and layout coordinates.
 * @returns {JSX.Element} An article element representing the visual event block.
 */
export function Event({ event }: EventProps) {
    const baseEventConfig =
        "absolute overflow-hidden bg-accent-background pl-2 flex border-1 border-accent-background";
    const styleEventConfig = useMemo(
        () => ({
            top: `${event?.start}px`,
            height: `${event?.end - event?.start}px`,
            width: `${MAX_EVENT_WIDTH / event?.totalCols}px`,
            left: `${10 + (event?.colIndex * MAX_EVENT_WIDTH) / event?.totalCols}px`,
        }),
        [event]
    );

    return (
        <article className={baseEventConfig} style={styleEventConfig}>
            <div className="flex-1 bg-white">
                <h5>Sample Title</h5>
                <small>Sample Location</small>
            </div>
        </article>
    );
}
