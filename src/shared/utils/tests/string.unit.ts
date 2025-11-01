import { test, describe, expect } from 'vitest';

import { isContainedInOtherString } from '@/shared/utils/string';

describe('isContainedInOtherString', () => {
    test.for([
        [true, 'test', 'TESt'],
        [true, 'TESt', 'test'],
        [true, ' test   ', 'test'],
        [true, 'test', '   Test '],
        [true, 'est', 'test'],
        [true, 'tes', 'test'],
        [true, 'es', 'test'],
        [true, '', 'test'],
        [true, '   ', 'test'],
        [false, 'te st', 'test'],
        [false, 'test', 'te st'],
    ])('Return "%s" when searching "%s" in "%s"', ([expected, input, text]) => {
        expect(isContainedInOtherString(String(input), String(text))).toBe(
            expected
        );
    });
});
