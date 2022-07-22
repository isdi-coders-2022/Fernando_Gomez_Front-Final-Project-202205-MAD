import { BrowserRouter } from 'react-router-dom';
import { socket } from '../../chat/chat-socket';
import { mockRoom, preloadedState, reducer } from '../../utils/mocks';
import { fireEvent, render, screen } from '../../utils/test-utils';
import { Card } from './card';

jest.mock('../../chat/chat-socket');

describe('Given the Card component', () => {

    describe('When it is called', () => {
        test('Then it should render the component', async () => {
            render(
                <BrowserRouter>
                    <Card room={mockRoom} />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const element = screen.getByTestId('div-c');
            expect(element).toBeInTheDocument();
        });

        test('It should call the emitAndNavigate function', () => {
            socket.on = jest.fn()
            socket.emit = jest.fn()
            render(
                <BrowserRouter>
                    <Card room={mockRoom} />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const div = screen.getByTestId('div-c');
            fireEvent.click(div);

            expect(socket.emit).toHaveBeenCalled();
        });
    });
    describe('When calling the socket.on function', () => {
        test('It should access the socket.on function', () => {
            socket.on = jest.fn();
            render(
                <BrowserRouter>
                    <Card room={mockRoom} />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            expect(socket.on).toHaveBeenCalled();
        });
    });
});
