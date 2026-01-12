import classNames from "classnames";
import { memo, useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext";
import type { EventProps } from "../types/componentProps";
import { MAX_EVENT_WIDTH } from "../utils/constants";
import { generateTimeLabel } from "../utils/timeGrid";

const baseSpanConfig =
    "opacity-0 group-hover:opacity-100 transition-all text-text-color-dark text-sm duration-500 ease-in-out";

export const Event = memo(({ event, onClick }: EventProps) => {
    const { theme } = useTheme();

    const spanTime = useMemo(() => generateTimeLabel(event.start), [event, generateTimeLabel]);

    const styleEventConfig = useMemo(
        () => ({
            top: `${event?.start}px`,
            height: `${event?.end - event?.start}px`,
            width: `${MAX_EVENT_WIDTH / event?.totalCols}px`,
            left: `${10 + (event?.colIndex * MAX_EVENT_WIDTH) / event?.totalCols}px`,
        }),
        [event]
    );

    const baseEventContainerConfig = useMemo(
        () =>
            classNames(
                "absolute group overflow-hidden pl-1.5 flex border-accent-background transition-all duration-500 ease-in-out shadow-sm  cursor-pointer",
                "hover:shadow-lg",
                {
                    "bg-primary": theme === "light",
                    "bg-primary-dark": theme !== "light",
                }
            ),
        [theme]
    );

    const baseEventContentConfig = useMemo(
        () =>
            classNames("flex flex-col flex-1 pl-2", {
                "bg-secondary": theme === "light",
                "bg-secondary-dark": theme !== "light",
            }),
        [theme]
    );

    return (
        <article className={baseEventContainerConfig} style={styleEventConfig} onClick={onClick}>
            <div className={baseEventContentConfig}>
                <h5 className="flex justify-between pr-1">
                    <span className="text-text-color-dark">{event.title}</span>
                    <span className={baseSpanConfig}>{spanTime}</span>
                </h5>
                <small className="opacity-50">{event.description}</small>
            </div>
        </article>
    );
});
