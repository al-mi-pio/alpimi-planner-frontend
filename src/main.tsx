import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import './i18n';

import { GlobalStyle } from '@/main.style';
import { ThemeProvider } from '@/shared/contexts/ThemeProvider';

const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
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
                <RouterProvider router={router} />
            </QueryClientProvider>
        </ThemeProvider>
    </React.StrictMode>
);
