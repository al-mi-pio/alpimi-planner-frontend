import { userEvent } from '@storybook/test';
import { afterEach, describe, expect, vi, test } from 'vitest';

import Search from '@/shared/components/Search';
import { render, screen } from '@/shared/test-utils/render';

describe('Search', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('Render component with correct value', () => {
        render(<Search defaultValue="Test value" />);

        expect(
            screen.getByRole('searchbox', { name: 'Search' })
        ).toHaveProperty('value', 'Test value');
    });

    test('Call onChange when input provided', async () => {
        const mockOnChange = vi.fn();

        render(<Search onChange={mockOnChange} />);

        const input = screen.getByRole('searchbox', { name: 'Search' });
        await userEvent.type(input, 'test');

        expect(input).toHaveProperty('value', 'test');
        expect(mockOnChange).toBeCalledTimes(4);
    });
});
