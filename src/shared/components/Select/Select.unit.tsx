import { act } from 'react';

import { userEvent } from '@storybook/test';
import { describe, expect, test } from 'vitest';

import Select from '@/shared/components/Select';
import { selectOptionsMock } from '@/shared/components/Select/mocks';
import { render, screen } from '@/shared/test-utils/render';

describe('Select', () => {
    test('Render correct labels and options', async () => {
        render(
            <Select
                label="Test label"
                error="Test error"
                defaultValue="Test value"
                options={selectOptionsMock}
            />
        );

        const user = userEvent.setup();
        const dropdown = screen.getByRole('combobox', {
            name: 'Test label Test error',
        });

        await act(async () => {
            await user.click(dropdown);
        });

        selectOptionsMock.forEach(({ label }) => {
            screen.getByRole('option', { name: label });
        });
    });

    test('Change value on option select', async () => {
        render(<Select label="Test label" options={selectOptionsMock} />);

        const user = userEvent.setup();
        const dropdown = screen.getByRole('combobox', {
            name: 'Test label',
        });

        await act(async () => {
            await user.click(dropdown);
        });

        const option = screen.getByRole('option', { name: 'Blue' });

        await act(async () => {
            await user.click(option);
        });

        expect(screen.queryByRole('option', { name: 'Blue' })).toBeNull();
        screen.getByText('Blue');
        expect(dropdown).toHaveProperty('value', '');
    });

    test('Correct text displayed when no results found', async () => {
        render(<Select label="Test label" options={selectOptionsMock} />);

        const user = userEvent.setup();
        const dropdown = screen.getByRole('combobox', {
            name: 'Test label',
        });

        await act(async () => {
            await user.type(dropdown, 'test');
        });

        expect(dropdown).toHaveProperty('value', 'test');
        screen.getByText('No results...');
    });

    test('Reset value on backspace click', async () => {
        render(<Select label="Test label" options={selectOptionsMock} />);

        const user = userEvent.setup();
        const dropdown = screen.getByRole('combobox', {
            name: 'Test label',
        });

        await act(async () => {
            await user.click(dropdown);
        });

        const option = screen.getByRole('option', { name: 'Blue' });

        await act(async () => {
            await user.click(option);
            await user.keyboard('{Backspace}');
        });

        expect(screen.queryByText('Blue')).toBeNull();
    });

    test('Show multiple values when isMulti=true', async () => {
        render(
            <Select
                label="Test label"
                isMulti={true}
                options={selectOptionsMock}
            />
        );

        const user = userEvent.setup();
        const dropdown = screen.getByRole('combobox', {
            name: 'Test label',
        });

        await act(async () => {
            await user.click(dropdown);
        });

        const option = screen.getByRole('option', { name: 'Blue' });

        await act(async () => {
            await user.click(option);
            await user.click(dropdown);
        });

        expect(screen.queryByRole('option', { name: 'Blue' })).toBeNull();

        const option2 = screen.getByRole('option', { name: 'Red' });

        await act(async () => {
            await user.click(option2);
        });

        screen.getByText('Blue');
        screen.getByText('Red');
    });

    test('Remove value on multiselect by clicking a button', async () => {
        render(
            <Select
                label="Test label"
                isMulti={true}
                options={selectOptionsMock}
            />
        );

        const user = userEvent.setup();
        const dropdown = screen.getByRole('combobox', {
            name: 'Test label',
        });

        await act(async () => {
            await user.click(dropdown);
        });

        const option = screen.getByRole('option', { name: 'Blue' });

        await act(async () => {
            await user.click(option);
        });

        const button = screen.getByRole('button');

        await act(async () => {
            await user.click(button);
        });

        expect(screen.queryByText('Blue')).toBeNull();
    });
});
