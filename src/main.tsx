import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx';
import './i18n';

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
        },
        {
            path: '*',
            element: 'Error 404',
        },
    ],
    { basename: '/alpimi-planner-frontend/' }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
