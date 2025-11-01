import styled from 'styled-components';

import P from '@/shared/components/P';
import { sizes } from '@/shared/constants/dimensions';

export const Label = styled(P)`
    margin-bottom: ${sizes.smallXXL};
    margin-left: ${sizes.smallXL};
`;

export const ErrorDescription = styled(P)`
    margin-top: ${sizes.smallXXL};
    margin-left: ${sizes.smallXL};
    color: ${(props) => props.theme.colors.error};
`;
