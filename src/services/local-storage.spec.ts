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
        Storage.prototype.removeItem = localStorageMock.removeItem;
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

            expect(user).toBe('');
        });
    });
    describe('When calling localStoreService.setUser', () => {
        it('Should call localStore.setItem', () => {
            
            localStoreService.setUser('user');

            expect(localStorageMock.setItem).toHaveBeenCalled();
        });
    });
    describe('When calling localStoreService.removeUser', () => {
        it('Should call localStore.removeItem', () => {
            
            localStoreService.removeUser();

            expect(localStorageMock.removeItem).toHaveBeenCalled();
        });
    });
    /////////////////////////////////////
    describe('When calling localStoreService.getToken and there is a token in local storage', () => {
        it('Should call localStore.getItem', () => {
            (Storage.prototype.getItem as jest.Mock).mockReturnValue(
                JSON.stringify('token')
            );
            const token = localStoreService.getToken();

            expect(localStorageMock.getItem).toHaveBeenCalled();
            expect(token).toBe('token');
        });
    });

    describe('When calling localStoreService.getToken and there is no token in local storage', () => {
        it('Should call localStore.getItem', () => {
            localStorageMock.getItem.mockReturnValueOnce(undefined);
            const token = localStoreService.getToken();

            expect(token).toBe('');
        });
    });
    describe('When calling localStoreService.setToken', () => {
        it('Should call localStore.setItem', () => {
            
            localStoreService.setToken('token');

            expect(localStorageMock.setItem).toHaveBeenCalled();
        });
    });
    describe('When calling localStoreService.removeToken', () => {
        it('Should call localStore.removeItem', () => {
            
            localStoreService.removeToken();

            expect(localStorageMock.removeItem).toHaveBeenCalled();
        });
    });
});
