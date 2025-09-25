import styled from 'styled-components';

import { sizes } from '@/shared/constants/dimensions';

export const StyledButton = styled.button<{ $color?: string }>`
    cursor: pointer;
    background: none;
    border: none;
    border-radius: ${sizes.smallXL};
    aspect-ratio: 1;
    padding: 2px;
    ${({ $color }) => ($color ? `color: ${$color}` : '')};

    &:hover {
        background-color: ${({ theme }) => theme.colors.secondaryText};
    }

    & svg {
        ${({ $color }) => ($color ? `color: ${$color}` : '')};
        max-width: calc(${sizes.regular} - ${sizes.smallXL});
        max-height: calc(${sizes.regular} - ${sizes.smallXL});
    }
`;
