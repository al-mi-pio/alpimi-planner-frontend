import styled from 'styled-components';

export const SpinButtons = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SpinButton = styled.div`
    color: ${({ theme }) => theme.colors.secondaryText};
    font-size: 11px;
    line-height: 11px;
    user-select: none;
    cursor: pointer;
`;
