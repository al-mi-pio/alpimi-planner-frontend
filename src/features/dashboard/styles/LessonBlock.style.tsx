import styled from 'styled-components';

import { sizes } from '@/shared/constants/dimensions';

export const Wrapper = styled.div`
    width: 190px;
    height: 110px;
    display: flex;
    flex-direction: column;
    border-radius: ${sizes.smallXL};
    overflow: hidden;

    & p {
        color: ${({ theme }) => theme.colors.secondaryText};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export const Title = styled.div<{ $color: number }>`
    background-color: hsl(${({ $color }) => $color}deg 80% 50%);
    height: 30px;
    display: flex;
    align-items: center;
    padding: 0 ${sizes.smallXL};
    border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryText};
`;

export const Content = styled.div`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.primaryAccent};
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 ${sizes.smallXL};
`;

export const Row = styled.div`
    display: inline-flex;
    gap: 2px;

    & > svg {
        min-width: 19px;
        max-width: 19px;
        height: 19px;
    }
`;
