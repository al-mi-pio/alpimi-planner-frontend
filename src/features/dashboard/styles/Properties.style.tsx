import styled from 'styled-components';

import { sizes } from '@/shared/constants/dimensions';

export const Heading = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${sizes.small};
    margin-bottom: ${sizes.smallXL};
`;

export const StyledProperties = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${sizes.smallXL};
    gap: ${sizes.smallXL};
    overflow-y: auto;
`;

export const Bold = styled.span`
    font-weight: bold;
`;
