import type { DefaultTheme } from 'styled-components';

export const getMessageBoxColors = (theme: DefaultTheme) => ({
    success: theme.colors.success,
    warning: theme.colors.warning,
    error: theme.colors.error,
    info: theme.colors.highlight,
});
