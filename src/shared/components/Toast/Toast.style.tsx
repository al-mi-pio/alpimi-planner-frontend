import { createGlobalStyle } from 'styled-components';

import { fontSizes, lineHeights } from '@/shared/constants/dimensions';

export const GlobalToastStyles = createGlobalStyle`
    .Toastify__toast-icon::before {
        content: '';
        position: absolute;
        inset: 0;
        clip-path: polygon(50% 0, 75% 50%, 50% 100%, 25% 50%);
        background-color: ${({ theme }) => theme.colors.primaryText};
        z-index: -1;
    }
    
    .Toastify__toast--success .Toastify__toast-icon::before {
        clip-path: ellipse(42% 46%);
    }
    
    .Toastify__toast {
        gap: 5px;
        width: 500px;
        background: ${({ theme }) => theme.colors.primaryAccent};
        color: ${({ theme }) => theme.colors.secondaryText};
        font-size: ${fontSizes.regular};
        line-height: ${lineHeights.regular};
    }
    
    .Toastify__close-button {
        color: ${({ theme }) => theme.colors.secondaryText};
        position: unset;
        margin-left: auto;
        width: 20px;
        min-width: 20px;
        aspect-ratio: 1;
        padding-left: 1px;
        padding-top: 2px;
        overflow: clip;
    }
`;
