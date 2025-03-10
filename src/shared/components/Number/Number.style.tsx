import styled from 'styled-components';

export const StyledNumber = styled.div`
    & input {
        width: 5em;
    }

    & {
        position: relative;
        width: min-content;
    }

    &:after,
    &:before {
        position: absolute;
        right: 5px;
        width: 2em;
        height: 1.4em;
        font-size: 12px;
        pointer-events: none;
        padding-left: 4px;
        color: ${({ theme }) => theme.colors.secondaryText};
        background: ${({ theme }) => theme.colors.primaryAccent};
    }

    &:after {
        content: '\\25B2';
        margin-top: 10px;
    }

    &:before {
        content: '\\25BC';
        margin-bottom: -8px;
        bottom: 1em;
    }
`;
