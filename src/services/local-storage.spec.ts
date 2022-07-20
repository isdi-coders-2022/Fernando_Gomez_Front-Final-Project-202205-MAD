import { LocalStoreService } from './local-storage';

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    removeItem: jest.fn(),
    length: 2,
    key: jest.fn(),
};

describe('Given the LocalStoreService', () => {
    let localStoreService = new LocalStoreService();

    beforeEach(() => {
        Storage.prototype.getItem = localStorageMock.getItem;
        Storage.prototype.setItem = localStorageMock.setItem;
    });

    describe('When we instantiate the class', () => {
        it('should be created', () => {
            expect(localStoreService).toBeTruthy();
        });
    });

    describe('When calling localStoreService.getUser and there is a user in local storage', () => {
        it('Should call localStore.getItem', () => {
            (Storage.prototype.getItem as jest.Mock).mockReturnValue(
                JSON.stringify('user')
            );
            const user = localStoreService.getUser();

            expect(localStorageMock.getItem).toHaveBeenCalled();
            expect(user).toBe('user');
        });
    });

    describe('When calling localStoreService.getUser and there is no user in local storage', () => {
        it('Should call localStore.getItem', () => {
            localStorageMock.getItem.mockReturnValueOnce(undefined);
            const user = localStoreService.getUser();

            // expect(localStorageMock.getItem).toHaveBeenCalled();
            expect(user).toBe('');
        });
    });
});
