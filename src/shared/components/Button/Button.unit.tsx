import { userEvent } from '@storybook/test';
import { afterAll, describe, expect, test, vi } from 'vitest';

import Button from '@/shared/components/Button';
import { render, screen } from '@/shared/test-utils/render';

describe('Button.tsx', () => {
    afterAll(() => {
        vi.restoreAllMocks();
    });

    test('Render the button without any parameters', () => {
        render(<Button />);
        screen.getByRole('button');
    });

    test('Render the label correctly', () => {
        render(<Button label={'Test text'} appearance={'secondary'} />);
        screen.getByText('Test text');
    });

    test('Call onClick when clicked', async () => {
        const mockOnClick = vi.fn();
        const user = userEvent.setup();

        render(<Button label={'Test text'} onClick={mockOnClick} />);

        const button = screen.getByRole('button', { name: 'Test text' });
        await user.click(button);

        expect(mockOnClick).toBeCalledTimes(1);
    });
});
