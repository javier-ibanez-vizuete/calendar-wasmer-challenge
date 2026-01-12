import classNames from "classnames";
import { useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext";
import type { CalendarProps } from "../types/componentProps";
import { CONTAINER_HEIGHT, CONTAINER_PADDING, CONTAINER_WIDTH } from "../utils/constants";

export function Calendar({ children }: CalendarProps) {
    const { theme } = useTheme();

    const baseCalendarConfig = useMemo(
        () =>
            classNames("relative overflow-hidden", {
                "bg-accent-background": theme === "light",
                "bg-accent-background-dark": theme !== "light",
            }),
        [theme]
    );
    const styleCalendarConfig = useMemo(
        () => ({
            width: `${CONTAINER_WIDTH}px`,
            height: `${CONTAINER_HEIGHT}px`,
            paddingLeft: `${CONTAINER_PADDING}px`,
            paddingRight: `${CONTAINER_PADDING}px`,
        }),
        []
    );

    return (
        <section className={baseCalendarConfig} style={styleCalendarConfig}>
            {children}
        </section>
    );
}
