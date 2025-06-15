import ReactSelect from 'react-select';

import { StyledComponent } from '@storybook/theming';
import styled from 'styled-components';

import { fontSizes, lineHeights, sizes } from '@/shared/constants/dimensions';

// @ts-expect-error I gave up to type this properly
export const StyledSelect: StyledComponent<ReactSelect> = styled(ReactSelect)<{
    $error?: boolean;
}>`
    & div {
        font-size: ${fontSizes.small};
        line-height: ${lineHeights.small};
        color: ${(props) => props.theme.colors.secondaryText};
        scrollbar-color: ${(props) => props.theme.colors.secondaryText}
            transparent;
    }

    & > div {
        background-color: ${(props) => props.theme.colors.primaryAccent};
    }

    & > div:first-of-type > div:first-of-type div {
        color: ${(props) =>
            props.$error
                ? props.theme.colors.error
                : props.theme.colors.secondaryText};
    }

    & > div:first-of-type > div:first-of-type > div[class$='multiValue'] {
        background-color: ${(props) => props.theme.colors.elementBackground};
        div {
            color: ${(props) =>
                props.$error
                    ? props.theme.colors.error
                    : props.theme.colors.primaryText};
        }
    }

    border-radius: ${sizes.smallXL};
    width: 300px;
    outline: 1px solid ${(props) => props.theme.colors.primaryText};
    ${(props) =>
        props.$error
            ? `outline: 2px solid ${props.theme.colors.error};
                   color: ${props.theme.colors.error};`
            : ''};
`;
