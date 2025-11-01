import styled from 'styled-components';

import { sizes } from '@/shared/constants/dimensions';

export const StyledWindow = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

export const ImportSection = styled.div`
    display: flex;
    flex: 1;
    margin: 0 ${sizes.largeXXL};
    flex-direction: column;
    align-items: flex-start;
    gap: ${sizes.large};
`;

export const MultiStepWrapper = styled.div`
    min-height: 250px;
    display: flex;
    justify-content: center;
`;
