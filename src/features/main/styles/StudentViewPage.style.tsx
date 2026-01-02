import styled from 'styled-components';

import { Timetable } from '@/features/dashboard/components/Timetable';
import { sizes } from '@/shared/constants/dimensions';

export const PageWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${sizes.regular};
    gap: ${sizes.small};
`;

export const StyledTimetable = styled(Timetable)`
    overflow-y: auto;
    width: fit-content;
`;
