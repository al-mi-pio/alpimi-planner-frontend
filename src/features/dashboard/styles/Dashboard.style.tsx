import styled, { createGlobalStyle } from 'styled-components';

export const DashboardBodyStyles = createGlobalStyle`
    html,
    body {
        width: 100%;
    }
    
    html {
        height: 100%;
        display: table;
    }

    body {
        display: table-cell;
    }

    #root {
        height: 100vh;
        display: flex;
        flex-direction: column;
    }
`;

export const Content = styled.div`
    flex: 1;
    overflow-y: auto;
`;
