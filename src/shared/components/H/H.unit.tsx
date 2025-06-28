import { describe, test } from 'vitest';

import H from '@/shared/components/H';
import { render, screen } from '@/shared/test-utils/render';

describe('H', () => {
    test('Render correct text with no optional parameters', () => {
        render(<H level={1}>{'Test text'}</H>);
        screen.getByText('Test text');
    });
    test('Render correct text with all parameters', () => {
        render(
            <H level={6} bold secondary>
                {'Test text with parameters'}
            </H>
        );
        screen.getByText('Test text with parameters');
    });
});
