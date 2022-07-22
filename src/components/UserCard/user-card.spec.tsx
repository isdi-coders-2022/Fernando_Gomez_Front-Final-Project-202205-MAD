import { BrowserRouter } from 'react-router-dom';
import { socket } from '../../chat/chat-socket';
import { mockUser, preloadedState, reducer } from '../../utils/mocks';
import { fireEvent, render, screen } from '../../utils/test-utils';
import {UserCard} from './user-card';

jest.mock('../../chat/chat-socket');

describe('Given the UserCard component', () => {
    describe('When it is called', () => {
        test('Then it should render the component', async () => {
            render(
                <BrowserRouter>
                    <UserCard user={mockUser} />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const element = screen.getByText(/nick1/i);
            expect(element).toBeInTheDocument();
        });
    });

    describe('When calling the socket.on function', () => {
        test('It should access the socket.on function', () => {
            socket.on = jest.fn().mockResolvedValue('result');
            render(
                <BrowserRouter>
                    <UserCard user={mockUser} />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            expect(socket.on).toHaveBeenCalled();
        });
    });

    describe('When calling the handle click function', () => {
        test('It should call the socket.emit function', () => {
           
            socket.emit = jest.fn();
            render(
                <BrowserRouter>
                    <UserCard user={mockUser} />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            const div = screen.getByTestId('div-user-card');
            fireEvent.click(div);

            expect(socket.emit).toHaveBeenCalled();
        });
    });
});
