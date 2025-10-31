import styled from 'styled-components';

import P from '@/shared/components/P';
import { fontSizes, lineHeights, sizes } from '@/shared/constants/dimensions';

export const StyledContact = styled.div`
    display: flex;
    padding: ${sizes.largeXXL};
    gap: ${sizes.largeXXL};
`;

export const StyledP = styled(P)`
    font-size: ${fontSizes.large3Xl};
    line-height: ${lineHeights.large3Xl};
`;

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: ${sizes.regular};
    flex: 1;
    padding-right: ${sizes.largeXXL};
    & > button {
        width: fit-content;
    }

    & > :first-child,
    & > :nth-child(2) {
        width: 40%;
    }
`;
