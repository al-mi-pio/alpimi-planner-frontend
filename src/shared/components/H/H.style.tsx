import styled from 'styled-components';

import { HeadingLevel } from '@/shared/components/H/H';
import {
    fontSizes,
    lineHeights,
    fontWeights,
    sizes,
} from '@/shared/constants/dimensions';

export const StyledH = styled.p<{
    $level: HeadingLevel;
    $bold?: boolean;
    $secondary?: boolean;
}>`
    font-size: ${(props) => Object.values(fontSizes)[props.$level - 1]};
    line-height: ${lineHeights.small};
    margin: ${sizes.smallXL} 0;
    font-weight: ${(props) =>
        props.$bold ? fontWeights.bold : fontWeights.regular};
    color: ${(props) =>
        props.$secondary
            ? props.theme.colors.secondaryText
            : props.theme.colors.primaryText};
`;
