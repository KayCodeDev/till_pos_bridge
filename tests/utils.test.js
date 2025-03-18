const commonUtils = require('../src/utils/common.utils');

describe('Common Utils Tests', () => {
    describe('toSha256', () => {
        it('should return a SHA-256 hash', () => {
            const input = 'Hello World';
            const expectedOutput = '315f5bdb76d078c43b8ac0064e4a0164612b1fce77c869345bfc94c75894edd3';
            expect(commonUtils.toSha256(input)).toBe(expectedOutput);
        });
    });

    describe('formatDate', () => {
        it('should format a date string', () => {
            const input = '2022-07-25T14:30:00.000Z';
            const expectedOutput = '2022-07-25 14:30:00';
            expect(commonUtils.formatDate(input)).toBe(expectedOutput);
        });
    });
});

