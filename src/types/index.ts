import type { RawEvent } from "./events.type";

declare global {
    interface Window {
        layOutDay?: (events: RawEvent[]) => void;
    }
}

export type KeyType = string;

export type DataType = unknown;
