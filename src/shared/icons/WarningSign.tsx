import styled from 'styled-components';

const Icon = styled.svg<{ $weight: number; $secondary?: boolean }>`
    color: color-mix(
        in srgb,
        ${({ theme }) => theme.colors.warning}
            ${(props) => Math.round(props.$weight * 60 + 40)}%,
        ${(props) => (props.$secondary ? '#e7e7e7' : '#c2c2c2')}
    );
`;

const WarningSign = ({
    weight,
    secondary,
}: {
    weight?: number;
    secondary?: boolean;
}) => (
    <Icon
        $weight={weight ?? 1}
        $secondary={secondary}
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="50"
        height="50"
        viewBox="-4 -4 56 56"
    >
        <path
            fill="currentColor"
            d="M45.7 40 25.8 4a2.1 2.1 0 00-3.5 0L2.3 40A2 2 0 004 43H44a2 2 0 001.7-3ZM24 36a2 2 0 112-2 2 2 0 01-2 2Zm2-8a2 2 0 01-4 0V19a2 2 0 014 0Z"
        />
    </Icon>
);

export default WarningSign;
