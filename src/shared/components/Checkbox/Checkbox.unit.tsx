import { userEvent } from '@storybook/test';
import { afterEach, describe, expect, test, vi } from 'vitest';

import Checkbox from '@/shared/components/Checkbox';
import { render, screen } from '@/shared/test-utils/render';

describe('Checkbox', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('Render correct labels', () => {
        render(
            <Checkbox label="Test label" error="Test error" checked readOnly />
        );

        const input = screen.getByRole('checkbox', {
            name: 'Test label Test error',
        });

        expect(input).toHaveProperty('value', 'on');
        expect(input).toHaveProperty('checked', true);
    });

    test('Call onChange when clicked', async () => {
        const mockOnChange = vi.fn();
        const user = userEvent.setup();

        render(<Checkbox onChange={mockOnChange} />);

        const input = screen.getByRole('checkbox');
        expect(input).toHaveProperty('checked', false);

        await user.click(input);

        expect(mockOnChange).toHaveBeenCalledOnce();
    });
});
