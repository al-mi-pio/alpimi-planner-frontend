import React from 'react';

import { GlobalStyle } from '@/main.style';
import { ThemeProvider } from '@/shared/contexts/ThemeProvider';

export const AllTheProviders = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <ThemeProvider>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    );
};
