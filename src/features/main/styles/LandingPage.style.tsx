import styled from 'styled-components';

import Image from '@/shared/components/Image';
import { sizes } from '@/shared/constants/dimensions';

export const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Screenshot = styled(Image)`
    margin: ${sizes.largeXL} auto;
`;
