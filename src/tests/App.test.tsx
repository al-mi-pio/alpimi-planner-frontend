import { render, screen } from '@testing-library/react';

import App from '../App';
import { describe, it } from 'vitest';

describe('App', () => {
    it('Renders "Hello world"', () => {
        render(<App />);
        screen.getByText('Hello world');
    });
});
