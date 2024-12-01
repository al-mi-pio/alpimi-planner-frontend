import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx';
import './i18n';

import { GlobalStyle } from '@/main.style.tsx';
import { ThemeProvider } from '@/shared/contexts/Theme.tsx';

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

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <GlobalStyle />
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
);
