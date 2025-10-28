import styled from 'styled-components';

import { DashboardPageContent } from '@/features/dashboard/components/DashboardPageContent';
import LoadingBox from '@/shared/components/LoadingBox';
import { sizes } from '@/shared/constants/dimensions';

export const ScheduleList = styled(LoadingBox)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding: ${sizes.small};
    gap: ${sizes.smallXL};
`;

export const StyledDashboardPageContent = styled(DashboardPageContent)`
    & > div > div:first-child {
        width: 350px;
    }
`;
