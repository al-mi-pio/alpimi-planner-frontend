import { useContext } from 'react';

import { createGlobalStyle } from 'styled-components';

import { darkColors, lightColors } from '@/shared/constants/colors.ts';
import { ThemeContext } from '@/shared/contexts/Theme.tsx';

// noinspection CssUnknownTarget
const CommonGlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Inter';
        src: url('./fonts/Inter.ttf');
        font-weight: normal;
        font-style: normal;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    * {
        font-family: 'Inter', sans-serif;
        margin: 0;
    }
`;

const DarkGlobalStyle = createGlobalStyle`
    html,
    body {
        background-color: ${darkColors.primaryBackground};
    }
`;

const LightGlobalStyle = createGlobalStyle`
    html,
    body {
        background-color: ${lightColors.primaryBackground};
    }
`;

export const GlobalStyle = () => {
    const { theme } = useContext(ThemeContext);
    return (
        <>
            <CommonGlobalStyle />
            {theme === 'light' ? <LightGlobalStyle /> : <DarkGlobalStyle />}
        </>
    );
};
