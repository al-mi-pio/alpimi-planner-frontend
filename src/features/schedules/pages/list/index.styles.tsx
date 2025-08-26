import styled from 'styled-components';

import LoadingBox from '@/shared/components/LoadingBox';
import { sizes } from '@/shared/constants/dimensions';

export const ScheduleList = styled(LoadingBox)`
    display: flex;
    padding: ${sizes.small};
    gap: ${sizes.smallXL};
`;
