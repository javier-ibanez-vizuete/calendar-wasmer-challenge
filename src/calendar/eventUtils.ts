import type { EventRawGroup, ProcessedEvent, RawEvent } from "../types/events.type";

/**
 * Sorts an array of raw events in ascending order based on their start time.
 *
 * @param {RawEvent[]} rawEvents - The array of events to sort.
 * @returns {RawEvent[]} The sorted array of events.
 */
export const sortedRawEventByStart = (rawEvents: RawEvent[]): RawEvent[] => {
    return rawEvents.sort((eventA, eventB) => eventA?.start - eventB?.start);
};

/**
 * Groups sorted events into clusters based on time overlap.
 *
 * It iterates through the events and creates a new group whenever an event
 * does not overlap with the current cluster boundaries.
 *
 * @param {RawEvent[]} sortedEvents - An array of events, expected to be sorted by start time.
 * @returns {EventRawGroup[]} An array of event groups (arrays of events that share visual space).
 */
export const getEventsByGroups = (sortedEvents: RawEvent[]): EventRawGroup[] => {
    const eventGroups: EventRawGroup[] = [];
    let currentEventGroup: EventRawGroup = [sortedEvents[0]];
    let currentGroupEnd = sortedEvents[0].end;

    sortedEvents.slice(1).forEach((event) => {
        if (event.start < currentGroupEnd) {
            currentEventGroup.push(event);
            currentGroupEnd = Math.max(currentGroupEnd, event.end);
        }
        if (event.start >= currentGroupEnd) {
            eventGroups.push(currentEventGroup);
            currentEventGroup = [event];
            currentGroupEnd = event.end;
        }
    });

    if (currentEventGroup.length) eventGroups.push(currentEventGroup);

    return eventGroups;
};

/**
 * Processes grouped events to calculate layout properties (id, colIndex, totalCols).
 *
 * This function applies a packing algorithm ("First Fit") to assign columns to events
 * within a group so they don't overlap visually. It also calculates the total width
 * (totalCols) shared by the group.
 *
 * @param {RawEvent[][]} eventsGroups - An array of event groups to process.
 * @returns {ProcessedEvent[]} A flat array of events with all necessary layout metadata.
 */
export const processEventsFromGroups = (eventsGroups: RawEvent[][]): ProcessedEvent[] => {
    let globalIdCounter = 1;
    const finalEvents: ProcessedEvent[] = [];

    eventsGroups.forEach((group) => {
        const sortedGroup = [...group].sort((eventA, eventB) => eventA.start - eventB.start);

        const columnsEndTime: number[] = [];

        const groupWithData: ProcessedEvent[] = [];

        sortedGroup.forEach((event) => {
            let placed = false;
            let assignedColIndex = -1;

            for (let index = 0; index < columnsEndTime.length; index++) {
                if (event.start >= columnsEndTime[index]) {
                    columnsEndTime[index] = event.end;
                    assignedColIndex = index;
                    placed = true;
                    break;
                }
            }

            if (!placed) {
                columnsEndTime.push(event.end);
                assignedColIndex = columnsEndTime.length - 1;
            }

            const newEvent = {
                ...event,
                id: globalIdCounter++,
                colIndex: assignedColIndex,
                totalCols: 0,
            };

            groupWithData.push(newEvent);
        });

        const maxCols = columnsEndTime.length;

        const updatedGroup = groupWithData.map((event) => ({ ...event, totalCols: maxCols }));

        finalEvents.push(...updatedGroup);
    });

    return finalEvents;
};
