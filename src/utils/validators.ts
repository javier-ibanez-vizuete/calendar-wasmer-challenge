import type { RawEvent } from "../types/events.type";
import { CONTAINER_HEIGHT } from "./constants";

export const areEventsValid = (rawEvents: RawEvent[]): boolean => {
    for (const event of rawEvents) {
        if (!event.start || !event.end) {
            console.error("Invalid Data: Events must have 'start' and 'end' properties.");
            return false;
        }

        const { start, end } = event;

        if (typeof start !== "number" || typeof end !== "number") {
            console.error("Invalid Data Type: Event Properties must be numbers");
            return false;
        }
        if (start < 0 || end > CONTAINER_HEIGHT) {
            console.error(
                `Out of Range: Events time must be between 0 and ${CONTAINER_HEIGHT}. Received ${start} - ${end}`
            );
            return false;
        }
        if (start >= end) {
            console.error(`Logical Error: Start time (${start}) must to be smaller than End time (${end}).`);
            return false;
        }
    }
    return true;
};
