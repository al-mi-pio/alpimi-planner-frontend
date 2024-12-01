import { createContext, ReactNode, useCallback, useState } from 'react';

export type Theme = 'dark' | 'light';
export type ThemeContext = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContext>({
    theme: 'dark',
    setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setThemeState] = useState<Theme>(
        localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
    );

    const setTheme = useCallback((theme: Theme) => {
        localStorage.setItem('theme', theme);
        setThemeState(theme);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
