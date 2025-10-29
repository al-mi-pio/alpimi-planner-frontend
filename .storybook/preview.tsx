import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { http, HttpResponse } from 'msw';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { ThemeProvider } from 'styled-components';

import { authRefreshUrl } from '@/api/services/authService';
import Page404 from '@/features/main/pages/404';
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

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
});

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
    loaders: [
        mswLoader,
        () => {
            window.localStorage.setItem(
                'accessToken',
                'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNb2NrIElzc3VlciIsImlhdCI6MTc2MTY5MDI5OSwiZXhwIjoxNzkzMjI2Mjk5LCJhdWQiOiJ3d3cuZXhhbXBsZS5jb20iLCJzdWIiOiJtb2NrQGV4YW1wbGUuY29tIiwibG9naW4iOiJtb2NrVXNlciIsInVzZXJJZCI6IjAtMC0wLTAtMSJ9.SAHfsFlQoe-K4u7FIydljSmLHNuAS-jpJoe6f9ayPKQ'
            );
        },
    ],
    decorators: [
        (Story, context) => {
            const theme = context.parameters.theme || context.globals.theme;
            const { locale } = context.globals;

            queryClient.setQueryData(['user', '0-0-0-0-1'], {
                content: {
                    id: '0-0-0-0-1',
                    login: 'mockUser',
                    customURL: 'mockUrl',
                },
            });
            queryClient.setQueryData(
                ['schedule', 'mockUrl', 'mockScheduleName'],
                {
                    content: {
                        id: '0-0-0-0-2',
                        name: 'mockScheduleName',
                    },
                }
            );
            queryClient.setQueryData(['lessonPeriod'], {
                content: [
                    {
                        id: '0-0-1-0-0',
                        start: '08:00:00',
                    },
                ],
            });
            queryClient.setQueryData(['lesson'], {
                content: [],
            });
            queryClient.setQueryData(['group'], {
                content: [],
            });
            queryClient.setQueryData(['subgroup'], {
                content: [],
            });
            queryClient.setQueryData(['collision'], {
                content: [],
            });
            queryClient.setQueryData(
                ['lessonBlock', '0-0-0-0-2', '2025-10-27'],
                {
                    content: [],
                }
            );
            queryClient.setQueryData(['lessonBlock', '0-0-0-0-2'], {
                content: [],
            });
            queryClient.setQueryData(['teacher', '0-0-0-0-2'], {
                content: [],
            });
            queryClient.setQueryData(['dayOff'], {
                content: [],
            });
            queryClient.setQueryData(['classroom', '0-0-0-0-2'], {
                content: [],
            });
            queryClient.setQueryData(['scheduleSettings'], {
                content: {
                    id: '0-0-0-0-3',
                    schoolHour: 45,
                    schoolYearStart: '2025-10-30',
                    schoolYearEnd: '2026-10-30',
                    schoolDays: '0111110',
                    isPublic: false,
                },
            });

            const router = createMemoryRouter(
                [
                    {
                        path: '/:scheduleName',
                        loader: ({ params }) => ({
                            scheduleName: params.scheduleName,
                        }),
                        element: (
                            <Suspense
                                fallback={<div>loading translations...</div>}
                            >
                                <I18nextProvider i18n={i18n}>
                                    <ThemeProvider
                                        theme={
                                            theme === 'light'
                                                ? lightTheme
                                                : darkTheme
                                        }
                                    >
                                        <QueryClientProvider
                                            client={queryClient}
                                        >
                                            <GlobalStyle />
                                            <GlobalToastStyles />

                                            <Story />
                                        </QueryClientProvider>
                                    </ThemeProvider>
                                </I18nextProvider>
                            </Suspense>
                        ),
                    },
                    {
                        path: '*',
                        element: <Page404 />,
                    },
                ],
                {
                    initialEntries: ['/mockScheduleName'],
                }
            );

            useEffect(() => {
                i18n.changeLanguage(locale).then();
            }, [locale]);
            return <RouterProvider router={router} />;
        },
    ],
};

export default preview;
