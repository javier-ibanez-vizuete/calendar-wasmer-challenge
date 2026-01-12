import classNames from "classnames";
import { useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext";
import type { EventProps } from "../types/component_props";
import { MAX_EVENT_WIDTH } from "../utils/constants";

export function Event({ event, onClick }: EventProps) {
    const { theme } = useTheme();
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
                "absolute overflow-hidden pl-2.5 flex border-accent-background rounded-sm cursor-pointer",
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
                "bg-secondary-dark text-white": theme !== "light",
            }),
        [theme]
    );

    return (
        <article className={baseEventContainerConfig} style={styleEventConfig} onClick={onClick}>
            <div className={baseEventContentConfig}>
                <h5>{event.title}</h5>
                <small>{event.description}</small>
            </div>
        </article>
    );
}
