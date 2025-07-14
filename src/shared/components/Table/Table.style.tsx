import styled from 'styled-components';

import { sizes } from '@/shared/constants/dimensions';
import { FocusStyle } from '@/shared/styles/Common';

export const StyledTable = styled.table`
    border-collapse: collapse;
    border-spacing: 0;
    border: 2px solid ${({ theme }) => theme.colors.elementBackground};
    color: ${({ theme }) => theme.colors.primaryText};
    background-color: ${({ theme }) => theme.colors.primaryBackground};

    th {
        border: 2px solid ${({ theme }) => theme.colors.elementBackground};
        text-align: left;
        font-weight: inherit;
    }

    td,
    th {
        padding: 2px ${sizes.smallXL};
    }
`;

export const Row = styled.tr`
    cursor: default;

    &:hover {
        background-color: ${({ theme }) => theme.colors.secondaryText};
    }

    &:focus {
        ${FocusStyle}
    }

    &.selected {
        background-color: ${({ theme }) => theme.colors.highlight};
    }
`;
