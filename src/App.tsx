import { useEffect, useMemo, useState } from "react";
import { getEventsByGroups, processEventsFromGroups, sortedRawEventByStart } from "./calendar/eventUtils";
import { Calendar } from "./components/Calendar";
import { Event } from "./components/Event";
import { TimeGutter } from "./components/TimeGutter";
import { getDataFromSessionStorage, saveDataInSessionStorage } from "./helper/storage";
import type { ProcessedEvent, RawEvent } from "./types/events.type";
import { areEventsValid } from "./utils/validators";

/**
 * Default set of events used when the application initializes if no data
 * is found in session storage.
 */
const INITIAL_EVENTS_INPUT = [
    { start: 540, end: 600 },
    { start: 560, end: 620 },
    { start: 30, end: 150 },
    { start: 610, end: 670 },
];

/**
 * Fallback data used in case of processing errors or empty results to ensure
 * the UI always renders a demonstrable state.
 */
const mokaProcessedEvents = [
    { start: 540, end: 600, id: 1, colIndex: 0, totalCols: 4 },
    { start: 560, end: 620, id: 2, colIndex: 1, totalCols: 4 },
    { start: 30, end: 150, id: 3, colIndex: 2, totalCols: 4 },
    { start: 610, end: 670, id: 4, colIndex: 3, totalCols: 4 },
];

/**
 * The main application component for the Wasmer Calendar Challenge.
 *
 * This component orchestrates the entire calendar logic:
 * 1. Manages the state of raw events (persisted in SessionStorage).
 * 2. Processes raw events into layout-ready events (calculating positions and collisions).
 * 3. Exposes the required global API `window.layOutDay` for external interaction.
 * 4. Renders the TimeGutter and the Calendar visualization.
 *
 * @component
 * @returns {JSX.Element} The rendered application.
 */
export function App() {
    /**
     * State holding the raw event data.
     * Initializes lazily by checking SessionStorage first; falls back to INITIAL_EVENTS_INPUT.
     */
    const [events, setEvents] = useState<RawEvent[]>(() => {
        const rawEventsFromStorage = getDataFromSessionStorage("newRawEvents");
        return (rawEventsFromStorage as RawEvent[]) || INITIAL_EVENTS_INPUT;
    });

    /**
     * Memoized computation of processed events.
     *
     * This pipeline transforms raw input into visual components:
     * 1. Sorts events by start time.
     * 2. Groups overlapping events into clusters.
     * 3. Calculates column index and total width for each event (Bin Packing / First Fit).
     *
     * @returns {ProcessedEvent[]} An array of events ready to be rendered with CSS positioning.
     */
    const processedEvents = useMemo((): ProcessedEvent[] => {
        const rawEvents: RawEvent[] = [...events];

        if (!rawEvents.length) return mokaProcessedEvents;

        const sortedEvents = sortedRawEventByStart(rawEvents);
        if (!sortedEvents || !sortedEvents.length) return mokaProcessedEvents;

        const eventsGroups = getEventsByGroups(sortedEvents);
        if (!eventsGroups?.length) return mokaProcessedEvents;

        const processedEvents = processEventsFromGroups(eventsGroups);
        if (!processedEvents?.length) return mokaProcessedEvents;

        return processedEvents;
    }, [events]);

    /**
     * Handler function exposed to the global scope to update events externally.
     * Validates that the input is a non-empty array before updating state and storage.
     *
     * @param {RawEvent[]} rawEvents - Array of objects with start and end properties.
     */
    const handleNewEvents = (rawEvents: RawEvent[]): void => {
        if (!Array.isArray(rawEvents)) {
            console.error(`Invalid argument: Expected an array, received ${typeof rawEvents}`);
            return;
        }

        if (!areEventsValid(rawEvents)) return;

        if (!rawEvents.length) {
            console.warn("The Array is Empty");
            return;
        }

        setEvents(rawEvents);
        saveDataInSessionStorage("newRawEvents", rawEvents);
    };

    /**
     * Effect to bind the `layOutDay` function to the global window object.
     * This meets the specific requirement of the coding challenge to allow console interaction.
     * Cleans up the global property when the component unmounts.
     */
    useEffect(() => {
        window.layOutDay = handleNewEvents;

        return () => {
            delete window.layOutDay;
        };
    }, []);

    return (
        <>
            <h1>Challenge Calendar Wasmer</h1>
            <div className="flex p-4">
                <TimeGutter />
                <Calendar>
                    {processedEvents.map((event) => (
                        <Event key={event.id} event={event} />
                    ))}
                </Calendar>
            </div>
        </>
    );
}
