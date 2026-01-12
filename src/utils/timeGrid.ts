type TimeSlot = {
    timeLabel: string;
    formatLabel: string;
    top: number;
    isHour: boolean;
};

type TimeLine = {
    top: number;
    isHour: boolean;
};

export const generateTimeGrid = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const totalMinutes = 720;
    const interval = 30;
    const startHour = 9;

    for (let index = 0; index <= totalMinutes; index += interval) {
        const hour = Math.floor(startHour + index / 60);

        const minute = index % 60;

        const ampmFormat = hour >= 12 ? "PM" : "AM";
        // const displayHour = hour >= 12 ? hour - 12 : hour;
        const displayHour = hour % 12 || 12;
        const displayMinutes = minute === 0 ? "00" : minute;

        const newSlot = {
            timeLabel: `${displayHour}:${displayMinutes}`,
            formatLabel: `${ampmFormat}`,
            top: index,
            isHour: minute === 0,
        };

        slots.push(newSlot);
    }
    return slots;
};

export const generateTimeLines = (): TimeLine[] => {
    const lines: TimeLine[] = [];
    const totalMinutes = 720;
    const interval = 30;

    for (let index = 0; index <= totalMinutes; index += interval) {
        const isHour = index % 60 === 0;
        const newLine = {
            top: index,
            isHour: isHour,
        };
        lines.push(newLine);
    }

    return lines;
};
