import classNames from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getEventsByGroups, processEventsFromGroups, sortedRawEventByStart } from "./calendar/eventUtils";
import { Calendar } from "./components/Calendar";
import { Event } from "./components/Event";
import { ExerciseContainer } from "./components/ExerciseContainer";
import { TimeGutter } from "./components/TimeGutter";
import { useTheme } from "./contexts/ThemeContext";
import { getDataFromSessionStorage, saveDataInSessionStorage } from "./helper/storage";
import type { ProcessedEvent, RawEvent } from "./types/events.type";
import { areEventsValid } from "./utils/validators";

const INITIAL_EVENTS_INPUT = [
    { start: 540, end: 600 },
    { start: 560, end: 620 },
    { start: 30, end: 150 },
    { start: 610, end: 670 },
];

const mokaProcessedEvents = [
    {
        start: 540,
        end: 600,
        id: 1,
        colIndex: 0,
        totalCols: 4,
        title: "Example Title 1",
        description: "Example Description 1",
    },
    {
        start: 560,
        end: 620,
        id: 2,
        colIndex: 1,
        totalCols: 4,
        title: "Example Title 2",
        description: "Example Description 2",
    },
    {
        start: 30,
        end: 150,
        id: 3,
        colIndex: 2,
        totalCols: 4,
        title: "Example Title 3",
        description: "Example Description 3",
    },
    {
        start: 610,
        end: 670,
        id: 4,
        colIndex: 3,
        totalCols: 4,
        title: "Example Title 4",
        description: "Example Description 4",
    },
];

export function App() {
    const [events, setEvents] = useState<RawEvent[]>(() => {
        const rawEventsFromStorage = getDataFromSessionStorage("newRawEvents");
        return (rawEventsFromStorage as RawEvent[]) || INITIAL_EVENTS_INPUT;
    });

    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState<ProcessedEvent | null>(null);
    const { theme } = useTheme();

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

    const handleNewEvents = useCallback((rawEvents: RawEvent[]): void => {
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
    }, []);

    useEffect(() => {
        window.layOutDay = handleNewEvents;

        return () => {
            delete window.layOutDay;
        };
    }, [handleNewEvents]);

    const onCloseModal = useCallback(() => setShowModal(false), []);
    const onOpenModal = useCallback((event: ProcessedEvent) => {
        setModalInfo(event);
        setShowModal(true);
    }, []);

    const baseAppConfig = useMemo(
        () =>
            classNames("flex flex-col items-center py-4 h-screen", {
                "bg-background text-text-color": theme === "light",
                "bg-background-dark text-text-color-dark": theme !== "light",
            }),
        [theme]
    );

    return (
        <div className={baseAppConfig}>
            {/* <header className="flex gap-4">
                <h1>Calendar Wasmer Challenge</h1>
                <ThemeButton />
            </header> */}
            {/* <Modal
                isOpen={showModal}
                onClose={() => onCloseModal()}
                title={modalInfo?.title}
                description={modalInfo?.description}
            /> */}
            <ExerciseContainer>
                <TimeGutter />
                <Calendar>
                    {/* <TimeLines /> */}
                    {processedEvents.map((event) => (
                        <Event key={event.id} event={event} />
                    ))}
                </Calendar>
            </ExerciseContainer>
        </div>
    );
}
