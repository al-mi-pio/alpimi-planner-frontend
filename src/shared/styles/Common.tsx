import styled, { css } from 'styled-components';

import { fontSizes, lineHeights, sizes } from '@/shared/constants/dimensions';

export const InputStyles = css<{ $error?: boolean }>`
    font-size: ${fontSizes.small};
    line-height: ${lineHeights.small};
    padding: ${sizes.smallXL};
    border: none;
    border-radius: ${sizes.smallXL};
    width: 300px;
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
