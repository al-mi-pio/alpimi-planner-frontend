import { describe, expect, test } from 'vitest';

import Link from '@/shared/components/Link';
import { render, screen } from '@/shared/test-utils/render';

describe('Link', () => {
    test('Render correct text', () => {
        render(<Link href="https://www.example.com/">{'Test text'}</Link>);

        const link = screen.getByRole('link', { name: 'Test text' });

        expect(link).toHaveProperty('href', 'https://www.example.com/');
    });
});
