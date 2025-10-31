import styled from 'styled-components';

import MessageBox from '@/shared/components/MessageBox';
import P from '@/shared/components/P';
import { fontSizes, lineHeights, sizes } from '@/shared/constants/dimensions';

export const StyledContact = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${sizes.regular};
    padding: ${sizes.largeXXL};
`;

export const Layout = styled.div`
    display: flex;
    gap: ${sizes.largeXXL};
`;

export const StyledP = styled(P)`
    font-size: ${fontSizes.large3Xl};
    line-height: ${lineHeights.large3Xl};
    white-space: nowrap;
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

export const StyledMessage = styled(MessageBox)`
    width: fit-content;
    margin: 0 auto;
`;
