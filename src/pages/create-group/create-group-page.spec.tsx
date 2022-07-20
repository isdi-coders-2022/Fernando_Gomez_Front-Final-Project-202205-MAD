import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { iRouterItem } from '../../interfaces/interfaces';
import { preloadedState, reducer } from '../../utils/mocks';
import { fireEvent, render, screen } from '../../utils/test-utils';
import { Layout } from '../../components/Layout/layout';
import CreateGroupPage from './create-group-page';
import { socket } from '../../chat/chat-socket';

jest.mock('../../chat/chat-socket');
const HomePage = React.lazy(() => import('../../pages/home/home-page'));

const mockRouterOptions: iRouterItem[] = [
    { path: '/', label: 'Home', page: <HomePage /> },
];

describe('Given the CreateGroup Page', () => {
    describe('when it is called', () => {
        test('it should be rendered', () => {
            render(
                <BrowserRouter>
                    <Layout navOptions={mockRouterOptions}>
                        <CreateGroupPage />
                    </Layout>
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const element = screen.getByText(/Crear grupo/i);
            expect(element).toBeInTheDocument();
        });
    });

    describe('When calling the socket.emit function', () => {
        test('It should access the socket.emit function', () => {
            socket.emit = jest.fn().mockResolvedValue('result');
            render(
                <BrowserRouter>
                    <Layout navOptions={mockRouterOptions}>
                        <CreateGroupPage />
                    </Layout>
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            const button = screen.getByTestId('submit-button');
            fireEvent.click(button);

            expect(socket.emit).toHaveBeenCalled();
        });
    });
});
