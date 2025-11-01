import styled, { css } from 'styled-components';

import { iconSize } from '@/shared/components/Tree/constants';

export const Indent = css`
    padding-left: ${iconSize};
`;

/**
 * A wrapper for TreeItems
 */
export const Tree = styled.div`
    width: fit-content;
`;

export const SubTree = styled.div`
    ${Indent}
`;
