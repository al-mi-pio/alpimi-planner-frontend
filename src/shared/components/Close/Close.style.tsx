import styled from 'styled-components';

import { sizes } from '@/shared/constants/dimensions';

export const StyledButton = styled.button<{ $color?: string }>`
    background: none;
    border: none;
    border-radius: ${sizes.smallXL};
    aspect-ratio: 1;
    ${({ $color }) => ($color ? `color: ${$color}` : '')};

    &:hover {
        background-color: ${({ theme }) => theme.colors.secondaryText};
    }
`;
