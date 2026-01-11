export type RawEvent = {
    start: number;
    end: number;
};

export type ProcessedEvent = RawEvent & {
    id: number | string;
    colIndex: number;
    totalCols: number;
    title: string;
    description: string;
};

export type EventRawGroup = RawEvent[];
