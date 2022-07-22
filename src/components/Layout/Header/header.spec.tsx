import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { iRouterItem } from '../../../interfaces/interfaces';
import { Header } from './header';
import { Layout } from '../layout';
import { fireEvent, render, screen } from '../../../utils/test-utils';
import { preloadedState, reducer } from '../../../utils/mocks';
import { socket } from '../../../chat/chat-socket';

jest.mock('../../../chat/chat-socket');
const HomePage = React.lazy(() => import('../../../pages/home/home-page'));

const mockRouterOptions: iRouterItem[] = [
    { path: '/', label: 'Home', page: <HomePage /> },
];

describe('Given the Header component', () => {
    beforeEach(() => {
        socket.emit = jest.fn();
    });
    describe('when it is called', () => {
        test('it should be rendered', () => {
            render(
                <BrowserRouter>
                    <Layout navOptions={mockRouterOptions}>
                        <Header navOptions={[]} />
                    </Layout>
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const display = screen.getByText(/Home/i);
            expect(display).toBeInTheDocument();
        });
    });

    describe('when logout button is clicked', () => {
        test('it should call the logout function', () => {
            socket.emit = jest.fn();

            render(
                <BrowserRouter>
                    <Layout navOptions={mockRouterOptions}>
                        <Header navOptions={[]} />
                    </Layout>
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const buttons = screen.getAllByRole('button');
            fireEvent.click(buttons[0]);
            const buttons2 = screen.getAllByRole('button');
            fireEvent.click(buttons2[2]);
            expect(socket.emit).toHaveBeenCalled();
        });
    });
});
