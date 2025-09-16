import styled from 'styled-components';

import { lineHeights } from '@/shared/constants/dimensions';

export const StyledIcon = styled.div`
    height: ${lineHeights.small};
    & svg {
        width: ${lineHeights.small};
        height: ${lineHeights.small};
    }
`;
