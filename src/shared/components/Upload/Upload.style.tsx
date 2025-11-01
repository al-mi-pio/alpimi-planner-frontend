import styled from 'styled-components';

import { sizes } from '@/shared/constants/dimensions';
import { InputStyles } from '@/shared/styles/Common';

export const StyledUpload = styled.div<{ $error?: boolean }>`
    ${InputStyles};
    padding: ${sizes.large};
    background: none;
    outline-style: dashed;
    outline-width: 2px;
    cursor: pointer;
`;
