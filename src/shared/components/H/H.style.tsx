import styled from 'styled-components';

import type { HeadingLevel } from '@/shared/components/H/types';
import {
    fontSizes,
    lineHeights,
    fontWeights,
} from '@/shared/constants/dimensions';

export const StyledH = styled.p<{
    $level: HeadingLevel;
    $bold: boolean;
    $secondary: boolean;
}>`
    font-size: ${(props) => Object.values(fontSizes)[props.$level - 1]};
    line-height: ${(props) => Object.values(lineHeights)[props.$level - 1]};
    font-weight: ${(props) =>
        props.$bold ? fontWeights.bold : fontWeights.regular};
    color: ${(props) =>
        props.$secondary
            ? props.theme.colors.secondaryText
            : props.theme.colors.primaryText};
`;
