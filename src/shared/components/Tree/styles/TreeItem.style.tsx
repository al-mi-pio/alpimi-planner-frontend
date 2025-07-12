import styled from 'styled-components';

import { iconSize } from '@/shared/components/Tree/constants';
import { Indent } from '@/shared/components/Tree/styles/Tree.style';
import { FocusStyle } from '@/shared/styles/Common';

export const StyledRow = styled.div<{ $indent?: boolean }>`
    ${({ $indent }) => ($indent ? Indent : '')}
    display: flex;
    align-items: center;
    cursor: pointer;

    & p {
        margin-left: 2px;
    }

    & svg {
        width: ${iconSize};
        height: ${iconSize};
    }

    &:hover {
        background-color: ${({ theme }) => theme.colors.secondaryText};
    }

    &:focus {
        ${FocusStyle}
    }
`;

export const ItemWrapper = styled.div<{ $isSelected?: boolean }>`
    display: flex;
    align-items: center;
    ${({ $isSelected, theme }) =>
        $isSelected ? `background-color: ${theme.colors.highlight}` : ''}
`;
