import { type ReactNode, useCallback, useState } from 'react';

import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { darkTheme, lightTheme } from '@/shared/constants/colors';
import { type Theme, ThemeContext } from '@/shared/contexts/ThemeContext';

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
            <StyledThemeProvider
                theme={theme === 'light' ? lightTheme : darkTheme}
            >
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    );
};
