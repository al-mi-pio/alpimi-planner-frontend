import styled from 'styled-components';

import P from '@/shared/components/P';

export const StyledLink = styled.a`
    text-decoration: none;
`;

export const StyledP = styled(P)`
    color: ${({ theme }) => theme.colors.highlight};
`;
