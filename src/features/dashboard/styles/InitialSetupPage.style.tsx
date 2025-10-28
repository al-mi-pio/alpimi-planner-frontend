import styled from 'styled-components';

import Text from '@/shared/components/Text';
import { sizes } from '@/shared/constants/dimensions';

export const FormWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    gap: ${sizes.regular};
`;

export const PeriodRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${sizes.small};
`;

export const StyledText = styled(Text)`
    margin-bottom: 22px;
    width: 150px;

    & + p {
        width: 150px;
    }
`;
