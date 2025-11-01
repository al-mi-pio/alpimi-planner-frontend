import { createGlobalStyle } from 'styled-components';

export const EditPageStyle = createGlobalStyle`
    .mosaic.mosaic-blueprint-theme{
        background: ${({ theme }) => theme.colors.primaryBackground};
    }
    .mosaic.mosaic-blueprint-theme .mosaic-split .mosaic-split-line {
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.elementBackground};
    }
    .mosaic-root {
        inset: 0;
    }
    .mosaic-tile {
        margin: 0;
    }
`;
