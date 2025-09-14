import styled from 'styled-components';

import LoadingBox from '@/shared/components/LoadingBox';
import { sizes } from '@/shared/constants/dimensions';

export const CreateScheduleForm = styled(LoadingBox)`
    display: flex;
    flex-direction: column;
    gap: ${sizes.regular};

    & > button {
        margin-left: auto;
    }
`;

export const FormContent = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

export const FormSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    gap: ${sizes.regular};
`;
