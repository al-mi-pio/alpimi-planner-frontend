import styled from 'styled-components';

import P from '@/shared/components/P';

export const ProgressBar = styled.div`
    display: flex;
    align-items: center;

    & > div:first-child,
    & > div:last-child {
        display: none;
    }
`;
export const Step = styled.div``;
export const Circle = styled.div<{ $filled: boolean }>`
    width: 30px;
    aspect-ratio: 1;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    position: relative;
    color: ${({ theme, $filled }) =>
        $filled ? theme.colors.secondaryText : theme.colors.primaryText};
    background-color: ${({ theme, $filled }) =>
        $filled ? theme.colors.primaryAccent : theme.colors.elementBackground};
`;
export const Label = styled(P)`
    position: absolute;
    bottom: 32px;
    left: -60px;
    width: 150px;
    padding: 0 8px;
    text-align: center;
    min-height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const Line = styled.div<{ $filled: boolean }>`
    height: 4px;
    width: 60px;
    margin: 0 -1px;
    background-color: ${({ theme, $filled }) =>
        $filled ? theme.colors.primaryAccent : theme.colors.elementBackground};
`;
