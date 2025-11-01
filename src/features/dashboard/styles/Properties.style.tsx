import styled from 'styled-components';

import H from '@/shared/components/H';
import { sizes } from '@/shared/constants/dimensions';

export const Heading = styled(H)`
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
