import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getDataFromSessionStorage, saveDataInSessionStorage } from "../helper/storage";

type Theme = "light" | "dark";

type ThemeContextProps = {
    children: ReactNode;
};

export type ThemeContextValue = {
    theme: Theme;
    onToggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: ThemeContextProps) => {
    const [theme, setTheme] = useState<Theme>("light");

    const onToggleTheme = useCallback(() => {
        setTheme((prevValue) => {
            const newThemeValue = prevValue === "light" ? "dark" : "light";
            saveDataInSessionStorage("theme", newThemeValue);
            return newThemeValue;
        });
    }, [theme]);

    useEffect(() => {
        const themeFromStorage = getDataFromSessionStorage("theme");
        if (themeFromStorage) setTheme(themeFromStorage as Theme);
    }, [theme]);

    const valueContext = useMemo<ThemeContextValue>(() => ({ theme, onToggleTheme }), [theme, onToggleTheme]);

    return <ThemeContext value={valueContext}>{children}</ThemeContext>;
};

export const useTheme = (): ThemeContextValue => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
};
