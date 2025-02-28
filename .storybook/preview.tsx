import type { Preview } from '@storybook/react';

import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from '@/main.style';
import {
    darkColors,
    darkTheme,
    lightColors,
    lightTheme,
} from '@/shared/constants/colors';

export const globalTypes = {
    theme: {
        name: 'ThemeProvider',
        description: 'Global theme for components',
        defaultValue: 'dark',
        toolbar: {
            icon: 'circlehollow',
            items: [
                { value: 'dark', icon: 'circlehollow', title: 'dark' },
                { value: 'light', icon: 'circle', title: 'light' },
            ],
            showName: true,
        },
    },
};

const preview: Preview = {
    parameters: {
        layout: 'centered',
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: {
            values: [
                { name: 'dark', value: darkColors.primaryBackground },
                { name: 'light', value: lightColors.primaryBackground },
            ],
            default: 'dark',
        },
    },
    tags: ['autodocs'],
    decorators: [
        (Story, context) => {
            const theme = context.parameters.theme || context.globals.theme;
            return (
                <ThemeProvider
                    theme={theme === 'light' ? lightTheme : darkTheme}
                >
                    <GlobalStyle />
                    <Story />
                </ThemeProvider>
            );
        },
    ],
};

export default preview;
