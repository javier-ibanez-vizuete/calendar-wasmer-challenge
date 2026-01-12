import classNames from "classnames";
import { useCallback, useMemo } from "react";
import { useTheme } from "../../contexts/ThemeContext";

const SUN_ICON = "☀️";
const MOON_ICON = "🌙";

const baseThemeButtonConfig =
    "flex justify-center items-center p-2 px-3 bg-secondary/60 border-secondary hover:bg-secondary w-14 h-10 rounded-sm transition-all duration-500 ease-in-out relative";

export function ThemeButton() {
    const { theme, onToggleTheme } = useTheme();

    const handleClick = useCallback(() => {
        onToggleTheme?.();
    }, []);

    const baseSunIconConfig = useMemo(
        () =>
            classNames("absolute transition-all duration-300 ease-in-out", {
                "opacity-100": theme === "light",
                "opacity-0": theme !== "light",
            }),
        [theme]
    );

    const baseMoonIconConfig = useMemo(
        () =>
            classNames("absolute transition-all duration-300 ease-in-out", {
                "opacity-0": theme === "light",
                "opacity-100": theme !== "light",
            }),
        [theme]
    );

    return (
        <button onClick={handleClick} className={baseThemeButtonConfig}>
            <span className={baseSunIconConfig}>{SUN_ICON}</span>
            <span className={baseMoonIconConfig}>{MOON_ICON}</span>
        </button>
    );
}
