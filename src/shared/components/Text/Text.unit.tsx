import { userEvent } from '@storybook/test';
import { afterEach, describe, expect, vi, test } from 'vitest';

import Text from '@/shared/components/Text';
import { render, screen } from '@/shared/test-utils/render';

describe('Text', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });
    test('Render correct labels', () => {
        render(
            <Text
                label="Test label"
                error="Test error"
                defaultValue="Test value"
            />
        );

        screen.getByRole('textbox', { name: 'Test label Test error' });
        expect(screen.getByRole('textbox')).toHaveProperty(
            'value',
            'Test value'
        );
    });
    test('Call onChange when input provided', async () => {
        const mockOnChange = vi.fn();

        render(<Text onChange={mockOnChange} />);

        const input = screen.getByRole('textbox');
        await userEvent.type(input, 'test');

        expect(mockOnChange).toBeCalledTimes(4);
    });
});
