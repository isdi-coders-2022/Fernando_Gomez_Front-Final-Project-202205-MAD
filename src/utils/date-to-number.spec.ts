import {dateToNumber} from './dateToNumber';

describe('Given the dateToNumberFunction with a date', () => {
    test('Should return the numbers only', () => {
        const result = dateToNumber('"2022-07-19T18:57:38.553Z"');

        expect(result).toBe('2022071918573855')
    });
})