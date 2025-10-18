import styled from 'styled-components';

import { sizes } from '@/shared/constants/dimensions';

export const LessonsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${sizes.small} ${sizes.small} ${sizes.smallXL};
`;

export const ScrollableLessons = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: ${sizes.smallXL};
    padding: ${sizes.small};
    gap: ${sizes.smallXL};
    overflow-y: auto;
`;
