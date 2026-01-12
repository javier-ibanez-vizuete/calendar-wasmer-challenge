import type { EventRawGroup, ProcessedEvent, RawEvent } from "../types/events.type";

export const sortedRawEventByStart = (rawEvents: RawEvent[]): RawEvent[] => {
    return rawEvents.sort((eventA, eventB) => eventA?.start - eventB?.start).slice(0, 100);
};

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
                title: "Sample Item",
                description: "Sample Location",
            };

            groupWithData.push(newEvent);
        });

        const maxCols = columnsEndTime.length;

        const updatedGroup = groupWithData.map((event) => ({ ...event, totalCols: maxCols }));

        finalEvents.push(...updatedGroup);
    });

    return finalEvents;
};
