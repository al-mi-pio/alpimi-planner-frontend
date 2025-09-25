import styled from 'styled-components';

import { sizes } from '@/shared/constants/dimensions';

export const DropdownMenu = styled.ul<{
    $top: number | null;
    $left: number | null;
    $open: boolean;
}>`
    position: absolute;
    min-width: 100%;
    display: inline-flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.elementBackground};
    list-style: none;
    padding: 0;
    margin: ${sizes.smallXL} 0;
    left: ${({ $left }) => ($left ? `${$left}px;` : '0')};
    top: ${({ $top }) => ($top ? `${$top}px;` : '100%')};
    visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
`;

export const StyledItem = styled.button`
    padding: ${sizes.smallXL} calc(${sizes.small} + ${sizes.smallXL});
    border: none;
    background: none;
    width: 100%;
    white-space: nowrap;
    text-align: left;
    color: ${({ theme }) => theme.colors.primaryText};
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) =>
            `color-mix(in srgb, ${theme.colors.primaryText} 50%, black 50%);`};
    }
`;
