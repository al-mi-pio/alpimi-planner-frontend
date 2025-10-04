import styled from 'styled-components';

import { sizes } from '@/shared/constants/dimensions';

export const Wrapper = styled.div``;
export const Navigation = styled.div``;
export const Scrollable = styled.div``;
export const Table = styled.div`
    display: inline-flex;
    flex-direction: column;
`;

export const TimetableRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const HeaderCellLeft = styled.div`
    width: 140px;
    min-height: 120px;
    text-align: center;
    padding: ${sizes.small};
    color: ${({ theme }) => theme.colors.primaryText};
    border-top: 2px solid ${({ theme }) => theme.colors.primaryAccent};
    border-bottom: 2px solid ${({ theme }) => theme.colors.primaryAccent};
    margin: -1px;
`;

export const HeaderCellTop = styled.div`
    min-width: 210px;
    text-align: center;
    color: ${({ theme }) => theme.colors.primaryText};
    border-left: 2px solid ${({ theme }) => theme.colors.primaryAccent};
    border-right: 2px solid ${({ theme }) => theme.colors.primaryAccent};
    margin: -1px;
`;

export const StyledCell = styled.div<{ $isDraggedOver: boolean }>`
    min-width: 210px;
    min-height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid ${({ theme }) => theme.colors.primaryAccent};
    margin: -1px;
    ${({ $isDraggedOver, theme }) =>
        $isDraggedOver && `background-color: ${theme.colors.highlight}50;`};
`;
