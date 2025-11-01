import styled from 'styled-components';

import { rotate } from '@/features/main/constants/animation';
import Image from '@/shared/components/Image';

export const StyledAbomination = styled(Image)`
    animation: ${rotate} 2s ease-in-out infinite;
`;
