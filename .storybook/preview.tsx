import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router';

import { http, HttpResponse } from 'msw';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { ThemeProvider } from 'styled-components';

import { authRefreshUrl } from '@/api/services/authService';
import i18n from '@/i18n';
import { GlobalStyle } from '@/main.style';
import { GlobalToastStyles } from '@/shared/components/Toast/Toast.style';
import {
    darkColors,
    darkTheme,
    lightColors,
    lightTheme,
} from '@/shared/constants/colors';

initialize({
    onUnhandledRequest: 'bypass',
});

const queryClient = new QueryClient();

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
        msw: {
            handlers: {
                auth: [
                    http.get(authRefreshUrl, () => {
                        return HttpResponse.json({
                            content: '123',
                        });
                    }),
                ],
            },
        },
    },
    tags: ['autodocs'],
    loaders: [mswLoader],
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
                            <QueryClientProvider client={queryClient}>
                                <GlobalStyle />
                                <GlobalToastStyles />
                                <MemoryRouter>
                                    <Story />
                                </MemoryRouter>
                            </QueryClientProvider>
                        </ThemeProvider>
                    </I18nextProvider>
                </Suspense>
            );
        },
    ],
};

export default preview;
