import styled from 'styled-components';

import P from '@/shared/components/P';
import { fontSizes, lineHeights, sizes } from '@/shared/constants/dimensions';

export const StyledHero = styled.div`
    background-image: url('/images/landing_background.webp');
    height: calc(100vh - 85px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${sizes.largeXXL};
    overflow: hidden;
`;

export const ImageWrapper = styled.div`
    @media (max-width: 1100px) {
        display: none;
    }
`;

export const StyledP = styled(P)`
    font-size: ${fontSizes.large3Xl};
    line-height: ${lineHeights.large3Xl};
    margin-bottom: ${sizes.smallXL};
    padding-right: ${sizes.regular};
`;

export const Highlight = styled.span`
    font-style: italic;
    font-weight: 800;
`;
