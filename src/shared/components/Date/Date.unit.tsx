import { describe, test } from 'vitest';

import Date from '@/shared/components/Date';
import { render, screen } from '@/shared/test-utils/render';

describe('Date.tsx', () => {
    test('Render correct labels', () => {
        render(<Date label="Test label" error="Test error" />);

        screen.getByText('Test label');
        screen.getByText('Test error');
    });
});
