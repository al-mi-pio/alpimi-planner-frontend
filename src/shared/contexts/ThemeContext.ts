import { createContext } from 'react';

export type Theme = 'dark' | 'light';
export type ThemeContext = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContext>({
    theme: 'dark',
    setTheme: () => {},
});
