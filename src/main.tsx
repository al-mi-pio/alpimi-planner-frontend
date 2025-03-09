import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import './i18n';

import { GlobalStyle } from '@/main.style';
import { ThemeProvider } from '@/shared/contexts/ThemeProvider';

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
            <GlobalStyle />
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
);
