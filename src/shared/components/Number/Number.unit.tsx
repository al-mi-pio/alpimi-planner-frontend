import { userEvent } from '@storybook/test';
import { afterEach, describe, expect, vi, test } from 'vitest';

import Number from '@/shared/components/Number';
import { render, screen } from '@/shared/test-utils/render';

describe('Number', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('Render correct labels', () => {
        render(
            <Number label="Test label" error="Test error" defaultValue="3" />
        );

        screen.getByRole('spinbutton', { name: 'Test label Test error' });
        expect(screen.getByRole('spinbutton')).toHaveProperty('value', '3');
    });

    test('Call onChange when input provided', async () => {
        const mockOnChange = vi.fn();
        const user = userEvent.setup();

        render(<Number onChange={mockOnChange} />);

        const input = screen.getByRole('spinbutton');
        await user.type(input, '123');

        expect(mockOnChange).toBeCalledTimes(3);
        expect(screen.getByRole('spinbutton')).toHaveProperty('value', '123');
    });

    test('Empty value when text input provided', async () => {
        render(<Number />);
        const user = userEvent.setup();

        const input = screen.getByRole('spinbutton');
        await user.type(input, 'test');

        expect(screen.getByRole('spinbutton')).toHaveProperty('value', '');
    });
});
