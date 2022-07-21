import React from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { iRouterItem } from '../../interfaces/interfaces';
import { mockUser, preloadedState, reducer } from '../../utils/mocks';
import { fireEvent, render, screen, waitFor } from '../../utils/test-utils';
import { Layout } from '../../components/Layout/layout';
import LoginPage from './login-page';
import { ApiChat } from '../../services/api';
import { useDispatch } from 'react-redux';

const navigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('../../services/api');
jest.mock('firebase/storage');

jest.mock('../../services/api');
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));

global.localStorage = {
    clear: jest.fn(),
    getItem: jest.fn(),
    key: jest.fn(),
    removeItem: jest.fn(),
    setItem: jest.fn(),
    length: 0,
};
const someValues = [{ name: 'name1' }];

describe('Given the LoginPage', () => {
    const HomePage = React.lazy(() => import('../../pages/home/home-page'));

    const mockRouterOptions: iRouterItem[] = [
        { path: '/', label: 'Home', page: <HomePage /> },
    ];
    const mockDispatch = jest.fn();

    beforeEach(() => {
        (ApiChat.prototype.login as jest.Mock).mockResolvedValue({
            user: mockUser,
            statusCode: 200,
        });
        (ApiChat.prototype.signup as jest.Mock).mockResolvedValue({
            user: mockUser,
            status: 201,
        });
        (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
        (useNavigate as jest.Mock).mockReturnValue(navigate);
    });

    describe('when it is called', () => {
        test('it should be rendered', () => {
            render(
                <BrowserRouter>
                    <Layout navOptions={mockRouterOptions}>
                        <LoginPage />
                    </Layout>
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const element = screen.getByTestId('login');
            expect(element).toBeInTheDocument();
        });
    });

    describe('When we click the button Login', () => {
        test('Then it should be called the ApiChat.login method', async () => {
            ApiChat.prototype.login = jest
                .fn()
                .mockResolvedValue({ token: 'token', user: mockUser });
            render(
                <BrowserRouter>
                    <Layout navOptions={mockRouterOptions}>
                        <LoginPage />
                    </Layout>
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            fireEvent.click(screen.getByTestId('login-button'));
            await waitFor(() => {
                expect(ApiChat.prototype.login).toHaveBeenCalled();
            });
        });
    });

    describe('When we change the input text', () => {
        test('Then it should be changed', () => {
            render(
                <BrowserRouter>
                    <LoginPage />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const input = screen.getByLabelText(/Nombre/i) as HTMLFormElement;
            fireEvent.change(input, { target: { value: 'test' } });

            expect(input).toHaveValue('test');
        });
    });

    describe('When we click the button Registrarme', () => {
        test('Then it should be called the ApiChat', () => {
            (useNavigate as jest.Mock).mockReturnValue(navigate);
            render(
                <BrowserRouter>
                    <LoginPage />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const str = JSON.stringify(someValues);

            const blob = new Blob([str]);
            const file = new File([blob], 'values.json', {
                type: 'application/JSON',
            });
            const input = screen.getByTestId('fileupload');
            fireEvent.change(input, { target: { files: [file] } });

            const name = screen.getByLabelText(/Nombre/) as HTMLFormElement;
            fireEvent.change(name, { target: { value: 'name' } });

            const surname = screen.getByLabelText(
                /Apellido/
            ) as HTMLFormElement;
            fireEvent.change(surname, { target: { value: 'surname' } });

            const nickname = screen.getByLabelText(/Nick/) as HTMLFormElement;
            fireEvent.change(nickname, { target: { value: 'nick' } });

            const email = screen.getByLabelText(/Email/) as HTMLFormElement;
            fireEvent.change(email, { target: { value: 'test@test.com' } });

            const contraseña = screen.getByLabelText(
                /Contraseña/
            ) as HTMLFormElement;
            fireEvent.change(contraseña, { target: { value: 'gf534g' } });

            fireEvent.click(screen.getByText(/Registrarme/i));

            expect(ApiChat).toHaveBeenCalled();
        });
    });
});
