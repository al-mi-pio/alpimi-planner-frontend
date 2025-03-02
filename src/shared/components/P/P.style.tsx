import styled from 'styled-components';

import {
    fontSizes,
    lineHeights,
    fontWeights,
} from '@/shared/constants/dimensions';

export const StyledP = styled.p<{ $bold: boolean; $secondary: boolean }>`
    font-size: ${fontSizes.small};
    line-height: ${lineHeights.small};
    font-weight: ${(props) =>
        props.$bold ? fontWeights.bold : fontWeights.regular};
    color: ${(props) =>
        props.$secondary
            ? props.theme.colors.secondaryText
            : props.theme.colors.primaryText};
`;
