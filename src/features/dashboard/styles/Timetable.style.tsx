import styled from 'styled-components';

import { Loading } from '@/features/main/components/Loading';
import { sizes } from '@/shared/constants/dimensions';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 1400px;
    height: 650px;
    padding: ${sizes.small} ${sizes.regular};
    background-color: ${({ theme }) => theme.colors.sectionBackground};
`;

export const Navigation = styled.div`
    display: flex;
    justify-content: space-between;
    text-align: center;

    & > div > p {
        width: 600px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`;

export const Scrollable = styled.div`
    padding: ${sizes.small} ${sizes.regular};
    flex: 1;
    overflow: auto;
`;

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

export const HeaderCellTop = styled.div<{ $disabled?: boolean }>`
    min-width: 210px;
    text-align: center;
    color: ${({ theme }) => theme.colors.primaryText};
    border-left: 2px solid ${({ theme }) => theme.colors.primaryAccent};
    border-right: 2px solid ${({ theme }) => theme.colors.primaryAccent};
    margin: -1px;
    ${({ $disabled, theme }) =>
        $disabled ? `background-color: ${theme.colors.error}90` : ''};
`;

export const StyledCell = styled.div<{
    $isDraggedOver: boolean;
    $disabled: boolean;
}>`
    min-width: 210px;
    min-height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid ${({ theme }) => theme.colors.primaryAccent};
    margin: -1px;
    ${({ $disabled, theme }) =>
        $disabled ? `background-color: ${theme.colors.error}40` : ''};
    ${({ $isDraggedOver, theme }) =>
        $isDraggedOver && `background-color: ${theme.colors.highlight}50;`};
`;

export const StyledLoading = styled(Loading)`
    background-color: ${({ theme }) => theme.colors.sectionBackground};
`;
