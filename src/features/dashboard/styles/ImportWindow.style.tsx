import styled from 'styled-components';

import LoadingBox from '@/shared/components/LoadingBox';
import { sizes } from '@/shared/constants/dimensions';

export const StyledWindow = styled(LoadingBox)`
    display: flex;
    height: 60vh;
    width: auto;
    flex-direction: row;
    justify-content: space-evenly;
    padding: ${sizes.large} 0;
    margin: 0 ${sizes.small};
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
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
