import styled from 'styled-components';

export const Icon = styled.svg<{ $secondary?: boolean }>`
    color: ${(props) =>
        props.$secondary
            ? props.theme.colors.secondaryText
            : props.theme.colors.primaryText};
`;
