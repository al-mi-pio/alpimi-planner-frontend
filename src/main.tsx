import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import App from './App';
import './i18n';

import LoginPage from '@/features/auth/pages/login';
import Auth from '@/features/auth/template';
import { GlobalStyle } from '@/main.style';
import { GlobalToastStyles } from '@/shared/components/Toast/Toast.style';
import { ThemeProvider } from '@/shared/contexts/ThemeProvider';

const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/login',
        element: (
            <Auth>
                <LoginPage />
            </Auth>
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
