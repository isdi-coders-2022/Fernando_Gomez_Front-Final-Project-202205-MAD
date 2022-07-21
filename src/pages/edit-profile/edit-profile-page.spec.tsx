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
import { fireEvent, render, screen, waitFor } from '../../utils/test-utils';
import { Layout } from '../../components/Layout/layout';
import { UsersList } from '../../components/UsersList/users-list';
import EditProfilePage from './edit-profile-page';
import { socket } from '../../chat/chat-socket';
import { LocalStoreService } from '../../services/local-storage';
import { ApiChat } from '../../services/api';
import sweetalert2 from 'sweetalert2';

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    removeItem: jest.fn(),
    length: 2,
    key: jest.fn(),
};

jest.mock('../../chat/chat-socket');

const HomePage = React.lazy(() => import('../../pages/home/home-page'));

const mockRouterOptions: iRouterItem[] = [
    { path: '/', label: 'Home', page: <HomePage /> },
];

describe('Given the CreateGroup Page', () => {
    let localStoreService = new LocalStoreService();

    beforeEach(() => {
        Storage.prototype.getItem = localStorageMock.getItem;
        Storage.prototype.setItem = localStorageMock.setItem;
        Storage.prototype.removeItem = localStorageMock.removeItem;
    });

    describe('when it is called', () => {
        socket.on = jest.fn();

        test('it should be rendered', () => {
            render(
                <BrowserRouter>
                    <Layout navOptions={mockRouterOptions}>
                        <EditProfilePage />
                    </Layout>
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const element = screen.getByTestId('delete-account');
            expect(element).toBeInTheDocument();
            expect(socket.on).toHaveBeenCalled();
        });
    });

    // describe('When clicking the Eliminar cuenta button', () => {
    //     test('It should call the Swal.fire function', async () => {
    //         ApiChat.prototype.deleteAccountUser = jest
    //             .fn()
    //             .mockResolvedValue({});
    //         render(
    //             <BrowserRouter>
    //                 <Layout navOptions={mockRouterOptions}>
    //                     <EditProfilePage />
    //                 </Layout>
    //             </BrowserRouter>,
    //             { preloadedState, reducer }
    //         );

    //         const button = screen.getByTestId('delete-account')
    //         screen.debug(button);

    //         const buttons = screen.getAllByRole('button');
    //         expect(buttons).toHaveLength(3);

    //         // const element = screen.getByTestId('edit-page');
    //         fireEvent.click(button);
    //         await waitFor(() => {
    //             expect(sweetalert2.fire).toHaveBeenCalled();
    //         });
    //     });
    // });
});
