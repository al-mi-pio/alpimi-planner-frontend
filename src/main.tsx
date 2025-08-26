import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import App from './App';
import './i18n';

import LoginPage from '@/features/auth/pages/login';
import Auth from '@/features/auth/template';
import Dashboard from '@/features/dashboard/template';
import { schedulesDashboardHeader } from '@/features/schedules/constants';
import SchedulesPage from '@/features/schedules/pages/list';
import { GlobalStyle } from '@/main.style';
import { GlobalToastStyles } from '@/shared/components/Toast/Toast.style';
import { landingPage, login, schedules } from '@/shared/constants/routes';
import { ThemeProvider } from '@/shared/contexts/ThemeProvider';

const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        path: landingPage,
        element: <App />,
    },
    {
        path: login,
        element: (
            <Auth>
                <LoginPage />
            </Auth>
        ),
    },
    {
        path: schedules,
        element: (
            <Dashboard headerProps={schedulesDashboardHeader}>
                <SchedulesPage />
            </Dashboard>
        ),
    },
    {
        path: '*',
        element: 'Error 404',
    },
]);

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <GlobalStyle />
                <GlobalToastStyles />
                <RouterProvider router={router} />
            </QueryClientProvider>
        </ThemeProvider>
    </React.StrictMode>
);
