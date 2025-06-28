import { describe, test } from 'vitest';

import P from '@/shared/components/P';
import { render, screen } from '@/shared/test-utils/render';

describe('P', () => {
    test('Render correct text with no parameters', () => {
        render(<P>{'Test text'}</P>);
        screen.getByText('Test text');
    });
    test('Render correct text with all parameters', () => {
        render(
            <P bold secondary>
                {'Test text with parameters'}
            </P>
        );
        screen.getByText('Test text with parameters');
    });
});
