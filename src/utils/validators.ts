import type { RawEvent } from "../types/events.type";
import { CONTAINER_HEIGHT } from "./constants";

export const areEventsValid = (rawEvents: RawEvent[]): boolean => {
    for (const event of rawEvents) {
        if (typeof event.start !== "number" || typeof event.end !== "number") {
            console.error("Invalid Data: Events must have 'start' and 'end' as numbers.");
            return false;
        }

        const { start, end } = event;

        // El resto de tus validaciones ya están bien
        if (start < 0 || end > CONTAINER_HEIGHT) {
            console.error(
                `Out of Range: Events time must be between 0 and ${CONTAINER_HEIGHT}. Received ${start} - ${end}`
            );
            return false;
        }

        if (start >= end) {
            console.error(`Logical Error: Start time (${start}) must be smaller than End time (${end}).`);
            return false;
        }
    }
    return true;
};
