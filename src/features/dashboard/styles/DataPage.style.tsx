import styled from 'styled-components';

import { Tree } from '@/shared/components/Tree';
import { sizes } from '@/shared/constants/dimensions';

export const DataTree = styled(Tree)`
    padding-top: ${sizes.small};
    padding-left: ${sizes.smallXXL};
`;

export const ImportWindow = styled.div`
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
