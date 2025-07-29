import styled, { createGlobalStyle } from 'styled-components';

import { sizes } from '@/shared/constants/dimensions';

export const AuthBodyStyles = createGlobalStyle`
    html,
    body {
        width: 100%;
        background: ${({ theme }) => `linear-gradient(${theme.colors.elementBackground}, ${theme.colors.primaryBackground}, ${theme.colors.primaryBackground})`};
    }
    
    html {
        height: 100%;
        display: table;
    }

    body {
        display: table-cell;
    }
    
    #root {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const CenterBox = styled.div`
    background-color: ${({ theme }) => theme.colors.elementBackground};
    box-shadow: -6px 6px ${({ theme }) => theme.colors.primaryText}80;
    padding: ${sizes.large};
    width: 450px;
`;

export const AuthForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: ${sizes.small};

    #alpimi-logo {
        margin: 0 auto;
    }

    & > button {
        margin-top: ${sizes.small};
    }
`;
