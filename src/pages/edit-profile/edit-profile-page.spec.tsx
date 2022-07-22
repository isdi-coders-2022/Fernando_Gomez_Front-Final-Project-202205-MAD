import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { iRouterItem } from '../../interfaces/interfaces';
import { preloadedState, reducer } from '../../utils/mocks';
import { fireEvent, render, screen } from '../../utils/test-utils';
import { Layout } from '../../components/Layout/layout';
import EditProfilePage from './edit-profile-page';
import { socket } from '../../chat/chat-socket';
import { LocalStoreService } from '../../services/local-storage';
import { ApiChat } from '../../services/api';
import userEvent from '@testing-library/user-event';
import * as firebase from 'firebase/storage';

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    removeItem: jest.fn(),
    length: 2,
    key: jest.fn(),
};
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('../../services/api');
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));
jest.mock('firebase/storage');
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

        jest.spyOn(firebase, 'uploadBytes').mockImplementation(
            () =>
                new Promise((resolve) => {
                    resolve({} as firebase.UploadResult);
                })
        );
        jest.spyOn(firebase, 'getDownloadURL').mockImplementation(
            () =>
                new Promise((resolve) => {
                    resolve('');
                })
        );
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

    describe('When we click the button Registrarme', () => {
        test('Then it should be called the ApiChat', () => {
            render(
                <BrowserRouter>
                    <EditProfilePage />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            const blob = new Blob([JSON.stringify({ test: 'test' })]);
            const file = new File([blob], 'values.json', {
                type: 'application/JSON',
            });
            const input = screen.getByTestId('fileupload');
            fireEvent.change(input, { target: { files: [file] } });

            const name = screen.getByLabelText(/Nombre/) as HTMLFormElement;
            userEvent.click(name);
            userEvent.keyboard('nombre');

            const surname = screen.getByLabelText(
                /Apellido/
            ) as HTMLFormElement;
            userEvent.type(surname, 'nombre');

            const nickname = screen.getByLabelText(/Nick/) as HTMLFormElement;
            userEvent.type(nickname, 'nombre');

            const email = screen.getByLabelText(/Email/) as HTMLFormElement;
            fireEvent.change(email, { target: { value: 'email' } });
            userEvent.type(email, 'nombre');

            fireEvent.click(screen.getByText(/Guardar cambios/i));

            expect(socket.emit).toHaveBeenCalled();
        });
    });
});
