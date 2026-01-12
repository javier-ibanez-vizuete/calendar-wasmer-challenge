import classNames from "classnames";
import { useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext";
import type { CalendarProps } from "../types/component_props";
import { CONTAINER_HEIGHT, CONTAINER_PADDING, CONTAINER_WIDTH } from "../utils/constants";

/**
 * Renders the main container for the single-day calendar view.
 *
 * This component establishes the fixed dimensions and structural layout required
 * by the specifications (620px width, 720px height, and padding). It serves
 * as the relative positioning context for all absolute-positioned children,
 * such as the time grid and the event items.
 *
 * @component
 * @param {CalendarProps} props - The component properties.
 * @param {React.ReactNode} props.children - The child elements to be rendered within the calendar (e.g., TimeGrid, Events).
 * @returns {JSX.Element} The structural section element wrapping the calendar content.
 */
export function Calendar({ children }: CalendarProps) {
    const { theme } = useTheme();

    const baseCalendarConfig = useMemo(
        () =>
            classNames("relative overflow-hidden rounded-sm", {
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
