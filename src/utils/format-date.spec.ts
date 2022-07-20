import {formatDate} from './formatDate';

describe('Given the dateToNumberFunction with a date', () => {
    test('Should return the new formatted date', () => {
        const result = formatDate('"2022-07-19T18:57:38.553Z"');

        expect(result).toBe('2022-07-19 18:57')
    });
})