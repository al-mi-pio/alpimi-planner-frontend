import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Button from '@/shared/components/Button';
import Checkbox from '@/shared/components/Checkbox';
import LoadingBox from '@/shared/components/LoadingBox';
import P from '@/shared/components/P';
import Text from '@/shared/components/Text';
import { StoryWrapper } from '@/shared/styles/Stories';

const CustomBox = () => {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');

    return (
        <StoryWrapper>
            <Checkbox
                label="Start loading items below"
                checked={loading}
                onChange={() => setLoading((prev) => !prev)}
            />
            <LoadingBox loading={loading}>
                <StoryWrapper>
                    <P>{'Example paragraph'}</P>
                    <Text
                        label="Example text field"
                        value={input}
                        onChange={({ target }) => setInput(target.value)}
                    />
                    <Button label="Example button" />
                </StoryWrapper>
            </LoadingBox>
        </StoryWrapper>
    );
};

export default {
    title: 'Shared/Components/LoadingBox',
    component: LoadingBox,
    render: CustomBox,
} satisfies Meta<typeof LoadingBox>;

export const Default: StoryObj<typeof LoadingBox> = {};
