import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import styled from 'styled-components';

import P from '@/shared/components/P';
import { TreeItem } from '@/shared/components/Tree/components/TreeItem';
import { Tree } from '@/shared/components/Tree/styles/Tree.style';
import { CollisionType } from '@/shared/components/Tree/types';
import Book from '@/shared/icons/Book';
import Clock from '@/shared/icons/Clock';
import Group from '@/shared/icons/Group';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

const CustomTree = () => {
    const [value, setValue] = useState<string | undefined>();
    const [isExpanded, setIsExpanded] = useState({
        expendableItem: false,
        thirdItem: false,
    });

    const onExpanded = (itemName?: string) =>
        setIsExpanded((prevState) => ({
            ...prevState,
            [itemName!]: !prevState[itemName as keyof typeof itemName],
        }));

    return (
        <Wrapper>
            <Tree tabIndex={0}>
                <TreeItem
                    icon={<Group />}
                    label="Single item"
                    isSelected={value === 'singleItem'}
                    onSelected={setValue}
                    onBlur={() => setValue(undefined)}
                    value="singleItem"
                />
                <TreeItem
                    icon={<Group />}
                    label="Expendable item"
                    isSelected={value === 'expendableItem'}
                    onSelected={setValue}
                    isExpanded={isExpanded.expendableItem}
                    onExpanded={onExpanded}
                    onBlur={() => setValue(undefined)}
                    status={{ type: CollisionType.both, inChildren: true }}
                    value="expendableItem"
                >
                    <TreeItem
                        icon={<Book />}
                        isSelected={value === 'firstItem'}
                        onSelected={setValue}
                        onBlur={() => setValue(undefined)}
                        value="firstItem"
                    />
                    <TreeItem
                        icon={<Clock />}
                        label="Second item"
                        isSelected={value === 'secondItem'}
                        onSelected={setValue}
                        onBlur={() => setValue(undefined)}
                        value="secondItem"
                    />
                    <TreeItem
                        label="Third item (expendable)"
                        isSelected={value === 'thirdItem'}
                        onSelected={setValue}
                        isExpanded={isExpanded.thirdItem}
                        onExpanded={onExpanded}
                        onBlur={() => setValue(undefined)}
                        status={{ type: CollisionType.both }}
                        value="thirdItem"
                    >
                        <TreeItem
                            icon={<Clock />}
                            label="Fourth item"
                            isSelected={value === 'fourthItem'}
                            onSelected={setValue}
                            onBlur={() => setValue(undefined)}
                            status={{ type: CollisionType.warning }}
                            value="fourthItem"
                        />
                        <TreeItem
                            icon={<Clock />}
                            label="Fifth item"
                            isSelected={value === 'fifthItem'}
                            onSelected={setValue}
                            onBlur={() => setValue(undefined)}
                            status={{ type: CollisionType.error }}
                            value="fifthItem"
                        />
                    </TreeItem>
                </TreeItem>
            </Tree>
            <P>{`Current value: ${value}`}</P>
        </Wrapper>
    );
};

export default {
    title: 'Shared/Components/Tree',
    component: CustomTree,
    parameters: {
        docs: {
            description: { story: 'A wrapper for TreeItems' },
        },
    },
} satisfies Meta<typeof Tree>;

export const Default: StoryObj<typeof Tree> = {};
