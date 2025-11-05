import styled from 'styled-components';

import LoadingBox from '@/shared/components/LoadingBox';
import Number from '@/shared/components/Number';
import { sizes } from '@/shared/constants/dimensions';

export const ModalContent = styled(LoadingBox)`
    display: flex;
    align-items: flex-start;
    min-width: 400px;
    gap: ${sizes.small};
    padding: ${sizes.small};
    padding-top: ${sizes.smallXL};
`;

export const StyledNumber = styled(Number)`
    width: 135px;
`;

export const FormRow = styled.div`
    display: flex;
    gap: ${sizes.small};
    align-items: center;
    & > p {
        margin-top: ${sizes.small};
    }
    & > :has([type='checkbox']) {
        margin-top: ${sizes.smallXL};
    }
`;
