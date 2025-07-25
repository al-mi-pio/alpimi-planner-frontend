import React from 'react';
import { I18nextProvider } from 'react-i18next';

import { GlobalStyle } from '@/main.style';
import { GlobalToastStyles } from '@/shared/components/Toast/Toast.style';
import { ThemeProvider } from '@/shared/contexts/ThemeProvider';
import i18n from '@/shared/test-utils/i18n';

export const AllTheProviders = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <I18nextProvider i18n={i18n}>
            <ThemeProvider>
                <GlobalStyle />
                <GlobalToastStyles />
                {children}
            </ThemeProvider>
        </I18nextProvider>
    );
};
