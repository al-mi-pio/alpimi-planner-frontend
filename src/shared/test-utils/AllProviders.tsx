import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import { GlobalStyle } from '@/main.style';
import { GlobalToastStyles } from '@/shared/components/Toast/Toast.style';
import { ThemeProvider } from '@/shared/contexts/ThemeProvider';
import i18n from '@/shared/test-utils/i18n';

const queryClient = new QueryClient();

export const AllTheProviders = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <I18nextProvider i18n={i18n}>
            <ThemeProvider>
                <QueryClientProvider client={queryClient}>
                    <GlobalStyle />
                    <GlobalToastStyles />
                    <MemoryRouter>{children}</MemoryRouter>
                </QueryClientProvider>
            </ThemeProvider>
        </I18nextProvider>
    );
};
