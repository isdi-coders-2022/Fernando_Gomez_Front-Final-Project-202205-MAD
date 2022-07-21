import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { iRouterItem } from '../../interfaces/interfaces';
import { preloadedState, reducer } from '../../utils/mocks';
import { render, screen } from '../../utils/test-utils';
import { Layout } from '../../components/Layout/layout';
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

const HomePage = React.lazy(() => import('../../pages/home/home-page'));

const mockRouterOptions: iRouterItem[] = [
    { path: '/', label: 'Home', page: <HomePage /> },
];

describe('Given the CreateGroup Page', () => {
    beforeEach(() => {
        LocalStoreService.prototype.getToken = jest
            .fn()
            .mockReturnValue('token');
        LocalStoreService.prototype.removeToken = jest.fn();
        LocalStoreService.prototype.removeUser = jest.fn();
    });
    describe('when it is called', () => {
        (socket.on as jest.Mock).mockImplementation(
            (event: string, callback: () => void) => {
                callback();
            }
        );

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

    //         const button = screen.getByTestId('delete-account');

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
