import { useContext } from 'react';

import { createGlobalStyle } from 'styled-components';

import { darkColors, lightColors } from '@/shared/constants/colors';
import { ThemeContext } from '@/shared/contexts/ThemeContext';

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

    input:focus, a:focus, button:focus {
        outline: 2px solid ${(props) => props.theme.colors.highlight};
    }
`;

const DarkGlobalStyle = createGlobalStyle`
    html,
    body {
        background-color: ${darkColors.primaryBackground};
    }
    
    * {
        scrollbar-color: ${darkColors.primaryAccent} transparent;
        scrollbar-width: thin;
    }
`;

const LightGlobalStyle = createGlobalStyle`
    html,
    body {
        background-color: ${lightColors.primaryBackground};
    }

    * {
        scrollbar-color: ${lightColors.primaryAccent} transparent;
        scrollbar-width: thin;
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
