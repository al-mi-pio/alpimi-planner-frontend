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
    flex-direction: row;
    gap: ${sizes.largeXXL};

    @media (max-width: 1300px) {
        flex-direction: column;
        gap: ${sizes.large};
    }
`;

export const StyledP = styled(P)`
    font-size: ${fontSizes.large3Xl};
    line-height: ${lineHeights.large3Xl};
    white-space: nowrap;

    @media (max-width: 1100px) {
        font-size: 7.3vw;
    }
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
        width: 300px;
    }
`;

export const StyledMessage = styled(MessageBox)`
    width: fit-content;
    margin: 0 auto;
`;
