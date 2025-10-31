import styled from 'styled-components';

import P from '@/shared/components/P';
import { fontSizes, lineHeights, sizes } from '@/shared/constants/dimensions';

export const StyledAuthors = styled.div`
    text-align: center;
`;

export const StyledP = styled(P)`
    font-size: ${fontSizes.largeXXL};
    line-height: ${lineHeights.largeXXL};
    margin: 0 auto;
    scroll-margin-block-start: 100px;
`;
export const CardWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: ${sizes.large} 0;
    width: 80%;
    margin: 0 auto;
    gap: ${sizes.large};

    @media (max-width: 1100px) {
        flex-direction: column;
    }
`;
