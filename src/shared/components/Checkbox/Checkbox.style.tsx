import styled from 'styled-components';

export const StyledCheckbox = styled.input<{ $error?: boolean }>`
    & {
        appearance: none;
        position: relative;
        margin: 0;
        background-color: transparent;
        width: 2em;
        aspect-ratio: 1;
        border: 0.15em solid
            ${(props) =>
                props.$error
                    ? props.theme.colors.error
                    : props.theme.colors.primaryAccent};
        border-radius: 0.2em;
        transition: background-color 0.2s ease-in;
    }

    &:checked {
        transition: background-color 0.2s ease-out;
        background-color: ${(props) =>
            props.$error
                ? `color-mix(in srgb, ${props.theme.colors.error}, white)`
                : props.theme.colors.primaryText};
    }

    &::before {
        content: '';
        position: absolute;
        inset: 4px;
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        transition: background-color 0.2s ease-in;
    }

    &:checked::before {
        background-color: ${(props) =>
            props.$error
                ? props.theme.colors.error
                : props.theme.colors.elementBackground};
        transition: background-color 0.2s ease-out;
    }
`;

export const CheckboxWrapper = styled.div`
    display: flex;
    gap: 0.5em;
    align-items: flex-end;
`;
