import styled from 'styled-components';

import Button from '@/shared/components/Button';

export const StyledButton = styled(Button)<{ $color?: string }>`
    &,
    & svg {
        ${({ $color }) => ($color ? `color: ${$color}` : '')};
    }
`;
