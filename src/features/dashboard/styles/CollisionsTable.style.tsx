import styled from 'styled-components';

import { fontSizes, lineHeights, sizes } from '@/shared/constants/dimensions';

export const NoCollisionsWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    & > p {
        font-size: ${fontSizes.regular};
        line-height: ${lineHeights.regular};
    }
`;

export const TableWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ErrorsCount = styled.div`
    display: flex;
    padding: calc(${sizes.small} - ${sizes.smallXXL});
    gap: ${sizes.regular};

    & > p {
        display: flex;
        justify-content: center;
        gap: ${sizes.smallXXL};

        > svg {
            height: ${lineHeights.small};
            width: ${lineHeights.small};
        }
    }
`;
