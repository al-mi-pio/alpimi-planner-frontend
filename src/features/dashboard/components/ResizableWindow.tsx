import { type ComponentPropsWithRef, type ReactNode, useState } from 'react';

import {
    Content,
    SingleTab,
    Tab,
    Tabs,
    Wrapper,
} from '@/features/dashboard/styles/ResizableWindow.style';

export interface Tab {
    id: string;
    label: string;
    content: ReactNode;
}

export interface ResizableWindowProps extends ComponentPropsWithRef<'div'> {
    tabs: Tab[];
}

export const ResizableWindow = ({
    tabs,
    children,
    ...defaultProps
}: ResizableWindowProps) => {
    const [selectedId, setSelectedId] = useState(
        tabs.length ? tabs[0].id : undefined
    );
    const selectedTab = tabs.find((tab) => tab.id === selectedId);

    return (
        <Wrapper {...defaultProps}>
            {!!tabs.length && (
                <Tabs>
                    {tabs.length === 1 && (
                        <SingleTab>{tabs[0].label}</SingleTab>
                    )}
                    {tabs.length > 1 &&
                        tabs.map((tab, i) => {
                            let className = '';

                            if (tab.id === selectedTab?.id) {
                                className = 'selected';

                                if (!i) className += ' left-tab';
                                if (i === tabs.length - 1)
                                    className += ' right-tab';
                            }

                            return (
                                <Tab
                                    key={tab.id}
                                    onClick={() => setSelectedId(tab.id)}
                                    className={className}
                                >
                                    {tab.label}
                                </Tab>
                            );
                        })}
                </Tabs>
            )}

            <Content data-testid={`${selectedId}-window`}>
                {tabs.length ? selectedTab?.content : children}
            </Content>
        </Wrapper>
    );
};
