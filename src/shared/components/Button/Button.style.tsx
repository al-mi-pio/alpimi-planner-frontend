import styled from 'styled-components';

import { Appearance } from '@/shared/components/Button/types';
import { sizes } from '@/shared/constants/dimensions';

export const StyledButton = styled.button<{ $appearance?: Appearance }>`
    & {
        min-width: ${sizes.large3Xl};
        min-height: ${sizes.large};
        padding: ${sizes.smallXL} 3em;
        border-radius: 20px;
        border: 2px solid;
        ${(props) =>
            props.$appearance === 'secondary'
                ? 'background-color: transparent;' +
                  `border-color: ${props.theme.colors.primaryText};`
                : `background-color: ${props.theme.colors.success};` +
                  `border-color: ${props.theme.colors.success};`};
    }

    &:hover {
        cursor: pointer;
        background-color: ${(props) =>
            props.$appearance === 'secondary'
                ? `color(from ${props.theme.colors.primaryText} srgb r g b / 0.1)`
                : `color-mix(in srgb, ${props.theme.colors.success} 80%, black 20%)`};
    }

    &:active {
        background-color: ${(props) =>
            props.$appearance === 'secondary'
                ? `color(from ${props.theme.colors.primaryText} srgb r g b / 0.3)`
                : `color-mix(in srgb, ${props.theme.colors.success} 60%, black 40%)`};
    }
`;
