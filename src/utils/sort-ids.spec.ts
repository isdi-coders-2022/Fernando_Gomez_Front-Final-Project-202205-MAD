import { sortIds } from './sortIds';

describe('Given the dateToNumberFunction with an array of strings', () => {
    test('Should return the new sorted array', () => {
        const result = sortIds(['abc', 'aab']);

        expect(result).toStrictEqual(['aab', 'abc'])
    });
})