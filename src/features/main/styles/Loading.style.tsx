import styled from 'styled-components';

export const LoadingWrapper = styled.div<{ $width?: string; $height?: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ $width }) => ($width ? $width : '100%')};
    height: ${({ $height }) => ($height ? $height : '100%')};
`;
