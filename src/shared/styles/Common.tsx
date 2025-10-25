import styled, { css } from 'styled-components';

import type { Appearance } from '@/shared/components/Button/types';
import { fontSizes, lineHeights, sizes } from '@/shared/constants/dimensions';

export const FocusStyle = css`
    outline: 2px solid ${(props) => props.theme.colors.highlight};
`;

export const InputStyles = css<{ $error?: boolean }>`
    font-size: ${fontSizes.small};
    line-height: ${lineHeights.small};
    padding: ${sizes.smallXL};
    border: none;
    border-radius: ${sizes.smallXL};
    width: 100%;
    color: ${(props) => props.theme.colors.secondaryText};
    background-color: ${(props) => props.theme.colors.primaryAccent};
    outline: 1px solid ${(props) => props.theme.colors.primaryText};
    ${(props) =>
        props.$error
            ? `outline: 2px solid ${props.theme.colors.error};
                   input, & {color: ${props.theme.colors.error};}`
            : ''};

    & > input::-webkit-outer-spin-button,
    & > input::-webkit-inner-spin-button {
        display: none;
    }

    & > input[type='number'] {
        appearance: textfield;
    }
`;

export const StyledInput = styled.input<{ $error?: boolean }>`
    ${InputStyles}
`;

export const InnerInput = styled.input`
    font-size: ${fontSizes.small};
    line-height: ${lineHeights.small};
    background-color: transparent;
    border: none;
    padding: 0 0 0 1px;
    width: 100%;

    &:focus {
        outline: none;
    }
`;

export const InputWrapper = styled.div<{ $error?: boolean }>`
    ${InputStyles}

    &:has(input:focus-visible) {
        ${FocusStyle}
    }
    display: flex;
    gap: ${sizes.smallXL};
`;

export const ButtonStyles = (appearance?: Appearance) => css`
    & {
        min-width: ${sizes.large3Xl};
        min-height: ${sizes.large};
        padding: ${sizes.smallXL} 3em;
        border-radius: 20px;
        border: 2px solid;
        ${(props) =>
            appearance === 'secondary'
                ? 'background-color: transparent;' +
                  `border-color: ${props.theme.colors.primaryText};`
                : `background-color: ${props.theme.colors.success};` +
                  `border-color: ${props.theme.colors.success};`};
    }

    &:disabled {
        ${({ theme }) =>
            appearance === 'secondary'
                ? `> p {color: color-mix(in srgb, ${theme.colors.primaryText} 50%, black 50%);}` +
                  `border-color: color-mix(in srgb, ${theme.colors.primaryText} 50%, black 50%);`
                : `background-color: color-mix(in srgb, ${theme.colors.success} 50%, black 50%);` +
                  `border-color: color-mix(in srgb, ${theme.colors.success} 20%, black 80%);`};
    }

    &:hover:not(:disabled) {
        cursor: pointer;
        background-color: ${(props) =>
            appearance === 'secondary'
                ? `color(from ${props.theme.colors.primaryText} srgb r g b / 0.1)`
                : `color-mix(in srgb, ${props.theme.colors.success} 80%, black 20%)`};
    }

    &:hover:disabled {
        cursor: not-allowed;
    }

    &:active:not([disabled]) {
        background-color: ${(props) =>
            appearance === 'secondary'
                ? `color(from ${props.theme.colors.primaryText} srgb r g b / 0.3)`
                : `color-mix(in srgb, ${props.theme.colors.success} 60%, black 40%)`};
    }
`;

export const StyledButton = styled.button<{ $appearance?: Appearance }>`
    ${({ $appearance }) => ButtonStyles($appearance)}
`;

export const IconButton = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    border-radius: ${sizes.smallXL};
    padding: 2px;
    line-height: 0;
    max-height: fit-content;
    max-width: fit-content;

    &:disabled {
        opacity: 0.3;
    }

    &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.secondaryText};
    }

    &:hover:disabled {
        cursor: not-allowed;
    }
`;
