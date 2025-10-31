import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { useLoaderData } from 'react-router-dom';

import './i18n';

import LoginPage from '@/features/auth/pages/login';
import Auth from '@/features/auth/template';
import EditPage from '@/features/dashboard/pages/edit';
import InitialSetupPage from '@/features/dashboard/pages/initialSetup';
import Dashboard from '@/features/dashboard/template';
import Page404 from '@/features/main/pages/404';
import LandingPage from '@/features/main/pages/landing';
import {
    createScheduleDashboardHeader,
    editorDashboardHeader,
    initialSetupDashboardHeader,
    schedulesDashboardHeader,
} from '@/features/schedules/constants';
import CreateSchedulePage from '@/features/schedules/pages/create';
import SchedulesPage from '@/features/schedules/pages/list';
import { GlobalStyle } from '@/main.style';
import { GlobalToastStyles } from '@/shared/components/Toast/Toast.style';
import {
    createSchedule,
    editSchedule,
    initialScheduleSetup,
    landingPage,
    login,
    schedules,
} from '@/shared/constants/routes';
import { ThemeProvider } from '@/shared/contexts/ThemeProvider';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});
const router = createBrowserRouter([
    {
        path: landingPage,
        element: <LandingPage />,
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
        path: createSchedule,
        element: (
            <Dashboard headerProps={createScheduleDashboardHeader}>
                <CreateSchedulePage />
            </Dashboard>
        ),
    },
    {
        path: editSchedule(':scheduleName'),
        loader: ({ params }) => ({ scheduleName: params.scheduleName }),
        Component: () => {
            const { scheduleName } = useLoaderData();
            return (
                <Dashboard headerProps={editorDashboardHeader(scheduleName)}>
                    <EditPage />
                </Dashboard>
            );
        },
    },
    {
        path: initialScheduleSetup(':scheduleName'),
        loader: ({ params }) => ({ scheduleName: params.scheduleName }),
        Component: () => {
            const { scheduleName } = useLoaderData();
            return (
                <Dashboard
                    headerProps={initialSetupDashboardHeader(scheduleName)}
                >
                    <InitialSetupPage />
                </Dashboard>
            );
        },
    },
    {
        path: '*',
        element: <Page404 />,
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
