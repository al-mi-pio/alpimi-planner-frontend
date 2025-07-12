import styled, { css } from 'styled-components';

import { iconSize } from '@/shared/components/Tree/constants';

const CircleIcon = css`
    width: 8px;
    height: 8px;
    border-radius: 50%;
`;

export const StatusIconsWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: 2px;
    padding: 0;
    height: ${iconSize};
`;

export const WarningInChildrenIcon = styled.div<{
    $weight: number;
}>`
    ${CircleIcon};
    background-color: color-mix(
        in srgb,
        ${({ theme }) => theme.colors.warning}
            ${(props) => Math.round(props.$weight * 60 + 40)}%,
        #c2c2c2
    );
`;

export const ErrorInChildrenIcon = styled.div`
    ${CircleIcon};
    background-color: ${({ theme }) => theme.colors.error};
`;
