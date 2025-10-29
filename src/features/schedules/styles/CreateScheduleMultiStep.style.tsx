import styled from 'styled-components';

import MultiStep from '@/shared/components/MultiStep';
import { sizes } from '@/shared/constants/dimensions';

export const StyledMultiStep = styled(MultiStep)`
    margin: calc(${sizes.large} - ${sizes.smallXL}) ${sizes.regular}
        ${sizes.small};
`;
