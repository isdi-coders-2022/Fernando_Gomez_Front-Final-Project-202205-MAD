import {store} from './store';

describe('Given the store', () => {
    describe('When imported', () => {
        test('Should be an object', () => {
            expect(store).toBeTruthy();
        });
    });
});