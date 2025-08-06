import { act } from 'react';

import { userEvent } from '@storybook/test';
import { afterAll, beforeEach, describe, expect, test, vi } from 'vitest';

import { authLogin } from '@/api/services/authService';
import LoginPage from '@/features/auth/pages/login';
import { render, screen } from '@/shared/test-utils/render';

vi.mock('@/api/services/authService', { spy: true });

describe('LoginPage', () => {
    afterAll(() => {
        vi.restoreAllMocks();
    });

    beforeEach(() => {
        render(<LoginPage />);
    });

    test('Render components correctly', () => {
        screen.getByRole('img', { name: 'Alpimi Planner logo' });
        screen.getByRole('textbox', { name: 'Login' });
        screen.getByText('Password');
        screen.getByRole('button', { name: 'Sign in' });
        screen.getByRole('link', { name: 'I forgot my password' });
    });

    test('Calls api on submit', async () => {
        const user = userEvent.setup();

        const login = screen.getByRole('textbox', { name: 'Login' });
        const password = screen.getByText('Password');
        const button = screen.getByRole('button', { name: 'Sign in' });

        await act(async () => {
            await user.type(login, 'mockLogin');
            await user.type(password, 'mockPassword');
            await user.click(button);
        });

        expect(authLogin).toHaveBeenCalledOnce();
        expect(authLogin).toHaveBeenCalledWith({
            login: 'mockLogin',
            password: 'mockPassword',
        });
    });
});
