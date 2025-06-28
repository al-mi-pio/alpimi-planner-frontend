import type { Preview } from '@storybook/react';
import { Suspense, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

import { ThemeProvider } from 'styled-components';

import i18n from '@/i18n';
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
    locale: {
        name: 'Locale',
        description: 'Internationalization locale',
        toolbar: {
            icon: 'globe',
            items: [
                { value: 'en', title: 'English' },
                { value: 'pl', title: 'Polski' },
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
            const { locale } = context.globals;

            useEffect(() => {
                i18n.changeLanguage(locale).then();
            }, [locale]);
            return (
                <Suspense fallback={<div>loading translations...</div>}>
                    <I18nextProvider i18n={i18n}>
                        <ThemeProvider
                            theme={theme === 'light' ? lightTheme : darkTheme}
                        >
                            <GlobalStyle />
                            <Story />
                        </ThemeProvider>
                    </I18nextProvider>
                </Suspense>
            );
        },
    ],
};

export default preview;
