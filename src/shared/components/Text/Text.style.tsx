import styled from 'styled-components';

import { darkColors, lightColors } from '@/shared/constants/colors.ts';
import {
    fontSizes,
    lineHeights,
    sizes,
} from '@/shared/constants/dimensions.ts';

const StyledInput = styled.input`
    & {
        font-size: ${fontSizes.small};
        line-height: ${lineHeights.small};
        padding: ${sizes.smallXL};
        border: none;
        border-radius: ${sizes.smallXL};
        width: 300px;
    }
    &:focus {
        outline: 2px solid ${darkColors.highlight};
    }
`;

export const DarkInput = styled(StyledInput)<{ $error?: boolean }>`
    color: ${darkColors.secondaryText};
    background-color: ${darkColors.primaryAccent};
    outline: 1px solid ${darkColors.primaryText};
    ${(props) =>
        props.$error ? `outline: 2px solid ${darkColors.error};` : ''};
`;

export const LightInput = styled(StyledInput)<{ $error?: boolean }>`
    color: ${lightColors.secondaryText};
    background-color: ${lightColors.primaryAccent};
    outline: 1px solid ${lightColors.primaryText};
    ${(props) =>
        props.$error ? `outline: 2px solid ${lightColors.error};` : ''};
`;

const StyledLabel = styled.p`
    font-size: ${fontSizes.small};
    line-height: ${lineHeights.small};
    margin-bottom: ${sizes.smallXXL};
    margin-left: ${sizes.smallXL};
`;

export const DarkLabel = styled(StyledLabel)`
    color: ${darkColors.primaryText};
`;

export const LightLabel = styled(StyledLabel)`
    color: ${lightColors.primaryText};
`;

const StyledDescription = styled.p`
    font-size: ${fontSizes.small};
    line-height: ${lineHeights.small};
    margin-top: ${sizes.smallXXL};
    margin-left: ${sizes.smallXL};
`;

export const DarkDescription = styled(StyledDescription)`
    color: ${darkColors.error};
`;

export const LightDescription = styled(StyledDescription)`
    color: ${lightColors.error};
`;
