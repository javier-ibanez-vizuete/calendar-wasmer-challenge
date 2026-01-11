import type { ReactNode } from "react";
import type { ProcessedEvent } from "./events.type";

export type CalendarProps = {
    children: ReactNode;
};

export type EventProps = {
    event: ProcessedEvent;
};
