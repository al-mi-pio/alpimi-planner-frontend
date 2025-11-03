import styled from 'styled-components';

import LoadingBox from '@/shared/components/LoadingBox';
import { sizes } from '@/shared/constants/dimensions';

export const ModalContent = styled(LoadingBox)`
    display: flex;
    gap: ${sizes.small};
    padding: ${sizes.small};
    padding-top: ${sizes.smallXL};
`;
