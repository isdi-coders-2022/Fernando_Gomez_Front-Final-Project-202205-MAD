import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { iRoom, iRouterItem, iStore, iUser } from '../../interfaces/interfaces';
import { loggedUserReducer } from '../../reducers/logged-user/reducer';
import { roomReducer } from '../../reducers/room/reducer';
import { userReducer } from '../../reducers/user/reducer';
import {
    mockUser,
    mockUser2,
    preloadedState,
    reducer,
} from '../../utils/mocks';
import { render, screen } from '../../utils/test-utils';
import { Layout } from '../../components/Layout/layout';
import { UsersList } from '../../components/UsersList/users-list';
import EditProfilePage from './edit-profile-page';
import { socket } from '../../chat/chat-socket';
import { LocalStoreService } from '../../services/local-storage';

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    removeItem: jest.fn(),
    length: 2,
    key: jest.fn(),
};

jest.mock('../../chat/chat-socket');

describe('Given the CreateGroup Page', () => {
    let localStoreService = new LocalStoreService();

    beforeEach(() => {
        Storage.prototype.getItem = localStorageMock.getItem;
        Storage.prototype.setItem = localStorageMock.setItem;
        Storage.prototype.removeItem = localStorageMock.removeItem;
    });

    describe('when it is called', () => {
        test('it should be rendered', () => {
            const HomePage = React.lazy(
                () => import('../../pages/home/home-page')
            );

            const mockRouterOptions: iRouterItem[] = [
                { path: '/', label: 'Home', page: <HomePage /> },
            ];

            render(
                <BrowserRouter>
                    <Layout navOptions={mockRouterOptions}>
                        <EditProfilePage />
                    </Layout>
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const element = screen.getByTestId('1');
            expect(element).toBeInTheDocument();
        });
    });

    describe('When calling the socket.on function', () => {
        test('It should access the socket.on function', () => {
            socket.on = jest.fn();
            render(
                <BrowserRouter>
                    <EditProfilePage />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            expect(socket.on).toHaveBeenCalled();
        });
    });
});
