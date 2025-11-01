import { type DefaultTheme, keyframes } from 'styled-components';

import { sizes } from '@/shared/constants/dimensions';

export const blink = (props: { theme: DefaultTheme }) => keyframes`
    from {
        background-color: ${props.theme.colors.primaryAccent}60;
        box-shadow: 0 0 0 ${sizes.smallXL} ${props.theme.colors.primaryAccent}60;
    }

    to {
        background-color: ${props.theme.colors.elementBackground}60;
        box-shadow: 0 0 0 ${sizes.smallXL} ${props.theme.colors.elementBackground}60;
    }
`;
