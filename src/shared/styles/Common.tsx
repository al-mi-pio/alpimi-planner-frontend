import styled, { css } from 'styled-components';

import { Appearance } from '@/shared/components/Button/types';
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
                   color: ${props.theme.colors.error};`
            : ''};
`;

export const StyledInput = styled.input<{ $error?: boolean }>`
    ${InputStyles}
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

    &:hover {
        cursor: pointer;
        background-color: ${(props) =>
            appearance === 'secondary'
                ? `color(from ${props.theme.colors.primaryText} srgb r g b / 0.1)`
                : `color-mix(in srgb, ${props.theme.colors.success} 80%, black 20%)`};
    }

    &:active {
        background-color: ${(props) =>
            appearance === 'secondary'
                ? `color(from ${props.theme.colors.primaryText} srgb r g b / 0.3)`
                : `color-mix(in srgb, ${props.theme.colors.success} 60%, black 40%)`};
    }
`;

export const StyledButton = styled.button<{ $appearance?: Appearance }>`
    ${({ $appearance }) => ButtonStyles($appearance)}
`;
