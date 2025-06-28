import styled from 'styled-components';

import { fontSizes, lineHeights, sizes } from '@/shared/constants/dimensions';
import { InputStyles } from '@/shared/styles/Common';

export const SearchInput = styled.input`
    font-size: ${fontSizes.small};
    line-height: ${lineHeights.small};
    background-color: transparent;
    border: none;
    padding: 0 0 0 1px;
    width: 100%;

    &:focus {
        outline: none;
    }
`;

export const StyledSearch = styled.div<{ $error?: boolean }>`
    ${InputStyles}

    &:has(input:focus-visible) {
        outline: 2px solid ${(props) => props.theme.colors.highlight};
    }
    display: flex;
    gap: ${sizes.smallXL};
`;

export const StyledIcon = styled.div`
    height: ${lineHeights.small};
    & svg {
        width: ${lineHeights.small};
        height: ${lineHeights.small};
    }
`;
