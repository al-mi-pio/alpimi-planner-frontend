import { userEvent } from '@storybook/test';
import { describe, expect, test, vi } from 'vitest';

import MessageBox from '@/shared/components/MessageBox';
import { render, screen } from '@/shared/test-utils/render';

describe('MessageBox', () => {
    test('Render correct text and the button', () => {
        render(<MessageBox>{'Test text'}</MessageBox>);

        screen.getByText('Test text');
    });

    test('Call onClose when close button clicked', async () => {
        const user = userEvent.setup();
        const mockOnClose = vi.fn();
        render(<MessageBox onClose={mockOnClose}>{'Test text'}</MessageBox>);

        const button = screen.getByRole('button', { name: 'Close' });
        await user.click(button);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('Render correct text and no button when provided with noClosing', () => {
        render(<MessageBox noClosing>{'Test text'}</MessageBox>);

        const button = screen.queryByRole('button', { name: 'Close' });

        expect(button).toBeNull();
    });
});
