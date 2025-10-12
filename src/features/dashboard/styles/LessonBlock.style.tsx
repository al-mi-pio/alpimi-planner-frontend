import styled from 'styled-components';

import { fontSizes, lineHeights, sizes } from '@/shared/constants/dimensions';
import { FocusStyle } from '@/shared/styles/Common';

export const Wrapper = styled.div<{ $hovered: boolean }>`
    ${({ $hovered }) => ($hovered ? FocusStyle : '')};
    min-width: 190px;
    max-width: 190px;
    height: 110px;
    display: flex;
    flex-direction: column;
    border-radius: ${sizes.smallXL};
    overflow: hidden;
    cursor: grab;

    & svg {
        min-width: 19px;
        max-width: 19px;
        height: 19px;
    }

    & p,
    & button {
        color: ${({ theme }) => theme.colors.secondaryText};
        font-size: ${fontSizes.small};
        line-height: ${lineHeights.small};
        white-space: nowrap;
    }

    &:hover {
        transform: scale(1.02);
        transition: 100ms ease-out;
    }
`;

export const Title = styled.div<{ $color: number }>`
    background-color: hsl(${({ $color }) => $color}deg 80% 50%);
    height: 30px;
    display: flex;
    align-items: center;
    padding: 0 ${sizes.smallXL};
    border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryText};

    & > p {
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const Content = styled.div`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.primaryAccent};
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 6px ${sizes.smallXL};
`;

export const Row = styled.div`
    flex: 1;
    display: inline-flex;
    gap: 2px;
    overflow: auto;
    align-items: center;

    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const Clickable = styled.button`
    padding: 0 ${sizes.smallXXL};
    border: none;
    display: inline-flex;
    align-items: center;
    background: none;

    &:has(~ button)::after {
        content: ',';
    }

    &:hover {
        background-color: ${({ theme }) => theme.colors.elementBackground}40;
    }
`;
