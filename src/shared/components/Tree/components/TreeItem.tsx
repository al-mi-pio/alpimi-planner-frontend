import { ComponentPropsWithRef, ReactNode } from 'react';

import P from '@/shared/components/P';
import { TreeItemStatusIcon } from '@/shared/components/Tree/components/TreeItemStatusIcon';
import { SubTree } from '@/shared/components/Tree/styles/Tree.style';
import {
    ItemWrapper,
    StyledRow,
} from '@/shared/components/Tree/styles/TreeItem.style';
import { TreeItemStatus } from '@/shared/components/Tree/types';
import Arrowhead from '@/shared/icons/Arrowhead';

export interface TreeItemProps extends ComponentPropsWithRef<'div'> {
    /**
     * An icon displayed on the left side of the row
     */
    icon?: ReactNode;
    /**
     * A text label displayed to describe the item
     */
    label?: string;
    /**
     * A string value that the item represents
     */
    value?: string;
    /**
     * A value used to expand and contract children items
     */
    isExpanded?: boolean;
    /**
     * A value used to select and deselect the item
     */
    isSelected?: boolean;
    /**
     * An event that runs on expanding and contracting the item
     */
    onExpanded?: (value?: string) => void;
    /**
     * An event that runs on selecting the item
     */
    onSelected?: (value?: string) => void;
    /**
     * Status icons displayed on the right side of the row
     */
    status?: TreeItemStatus;
}

/**
 * A UI component which represents an item of a tree. Can contain other TreeItems
 */
export const TreeItem = ({
    isExpanded,
    isSelected,
    onExpanded,
    onSelected,
    children,
    status,
    value,
    label,
    icon,
    ...defaultProps
}: TreeItemProps) => {
    const isExpandable =
        !!children && (!Array.isArray(children) || !!children.length);
    return (
        <>
            <StyledRow
                {...defaultProps}
                $indent={!children}
                tabIndex={0}
                onClick={
                    isExpandable
                        ? () => onExpanded && onExpanded(value)
                        : undefined
                }
            >
                {isExpandable && (
                    <Arrowhead direction={isExpanded ? 'down' : 'right'} />
                )}

                <ItemWrapper
                    onClick={() => onSelected && onSelected(value)}
                    $isSelected={isSelected}
                >
                    {icon}
                    <P>{label}</P>
                </ItemWrapper>

                {status && <TreeItemStatusIcon status={status} />}
            </StyledRow>

            {isExpanded && <SubTree>{children}</SubTree>}
        </>
    );
};
