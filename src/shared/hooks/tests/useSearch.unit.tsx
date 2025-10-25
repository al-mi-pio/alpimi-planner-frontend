import { renderHook, waitFor } from '@testing-library/react';
import { act, type ChangeEvent } from 'react';

import { describe, expect, vi, test, beforeEach, afterAll } from 'vitest';

import { useSearch } from '@/shared/hooks/useSearch';
import { mockColorData } from '@/shared/mocks/search';
import * as stringUtils from '@/shared/utils/string';

describe('useSearch', () => {
    const mockFilterDataUtil = vi.spyOn(
        stringUtils,
        'isContainedInOtherString'
    );

    beforeEach(() => {
        mockFilterDataUtil.mockClear();
    });

    test('Render correct initial parameters', async () => {
        const { result } = renderHook(() =>
            useSearch({ data: mockColorData, filterKey: 'name' })
        );

        await waitFor(() => {
            expect(mockFilterDataUtil).toHaveBeenCalledTimes(
                mockColorData.length
            );
        });

        expect(result.current.filteredData).toStrictEqual(mockColorData);
        expect(result.current.bindSearch).toStrictEqual({
            id: expect.any(String),
            onChange: expect.any(Function),
            value: '',
        });
    });

    test('Return changed value and call isContainedInOtherString() after onChange event', async () => {
        const { result } = renderHook(() =>
            useSearch({ data: mockColorData, filterKey: 'name' })
        );

        vi.useFakeTimers();
        act(() => {
            result.current.bindSearch.onChange({
                target: { value: 'ony' },
            } as ChangeEvent<HTMLInputElement>);
        });
        act(() => {
            vi.advanceTimersByTime(300);
        });
        vi.useRealTimers();

        await waitFor(() => {
            expect(mockFilterDataUtil).toHaveBeenCalledTimes(
                mockColorData.length * 2
            );
        });

        expect(result.current.filteredData).toStrictEqual([
            {
                description: 'Kolor ognia',
                name: 'Czerwony',
            },
            {
                description: 'Kolor roślin',
                name: 'Zielony',
            },
        ]);
        expect(result.current.bindSearch).toStrictEqual({
            id: expect.any(String),
            onChange: expect.any(Function),
            value: 'ony',
        });
    });

    test('Debounce filtering method calls when many onChange events occur', async () => {
        const { result } = renderHook(() =>
            useSearch({ data: mockColorData, filterKey: 'name' })
        );

        vi.useFakeTimers();
        act(() => {
            for (let i = 1; i <= 8; i++) {
                result.current.bindSearch.onChange({
                    target: { value: String(i) },
                } as ChangeEvent<HTMLInputElement>);
                vi.advanceTimersByTime(20);
            }
        });
        act(() => {
            vi.advanceTimersByTime(300);
        });
        vi.useRealTimers();

        await waitFor(() => {
            expect(mockFilterDataUtil).toHaveBeenCalledTimes(
                mockColorData.length * 2
            );
            expect(mockFilterDataUtil).toHaveBeenCalledWith('', 'Czerwony');
            for (let i = 1; i <= 7; i++) {
                expect(mockFilterDataUtil).not.toHaveBeenCalledWith(
                    String(i),
                    'Czerwony'
                );
            }
            expect(mockFilterDataUtil).toHaveBeenCalledWith('8', 'Czerwony');
        });

        expect(result.current.bindSearch).toStrictEqual({
            id: expect.any(String),
            onChange: expect.any(Function),
            value: '8',
        });
    });

    test("Don't debounce when onChange events occur slower than delay", async () => {
        const { result } = renderHook(() =>
            useSearch({
                data: mockColorData,
                filterKey: 'name',
                debounceDelay: 10,
            })
        );

        vi.useFakeTimers();
        for (let i = 1; i <= 8; i++) {
            act(() => {
                result.current.bindSearch.onChange({
                    target: { value: String(i) },
                } as ChangeEvent<HTMLInputElement>);
                vi.advanceTimersByTime(20);
            });
        }
        act(() => {
            vi.advanceTimersByTime(20);
        });
        vi.useRealTimers();

        await waitFor(() => {
            expect(mockFilterDataUtil).toHaveBeenCalledTimes(
                mockColorData.length * 9
            );
            expect(mockFilterDataUtil).toHaveBeenCalledWith('', 'Czerwony');
            for (let i = 1; i <= 8; i++) {
                expect(mockFilterDataUtil).toHaveBeenCalledWith(
                    String(i),
                    'Czerwony'
                );
            }
        });

        expect(result.current.bindSearch).toStrictEqual({
            id: expect.any(String),
            onChange: expect.any(Function),
            value: '8',
        });
    });

    afterAll(() => {
        mockFilterDataUtil.mockRestore();
    });
});
