import styled, { createGlobalStyle } from 'styled-components';

export const StoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

export const PageStoryStyles = createGlobalStyle`
    #storybook-root {
        width: 100%;
        padding: 0 !important;
    }
    body.sb-show-main {
        display: block !important;
    }

    .mosaic-blueprint-theme {
        height: 75vh;
    }
`;
