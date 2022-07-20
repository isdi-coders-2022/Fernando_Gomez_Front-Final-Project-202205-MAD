import { BrowserRouter } from 'react-router-dom';
import { socket } from '../../chat/chat-socket';
import { mockRoom, preloadedState, reducer } from '../../utils/mocks';
import { fireEvent, render, screen } from '../../utils/test-utils';
import { Card } from './card';

jest.mock('../../chat/chat-socket', () => ({ emit: jest.fn(), on: jest.fn() }));

describe('Given the Card component', () => {
    const mockEmit = jest.fn();

    describe('When it is called', () => {
        test('Then it should render the component', async () => {
            render(
                <BrowserRouter>
                    <Card room={mockRoom} />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const element = screen.getByTestId('2');
            expect(element).toBeInTheDocument();
        });

        test('It should call the emitAndNavigate function', () => {
            // Card.prototype.emitAndNavigate as jest.Mock;
            render(
                <BrowserRouter>
                    <Card room={mockRoom} />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const div = screen.getByTestId('1');
            console.log('div: ', div);
            fireEvent.click(div);

            expect(socket.emit).toHaveBeenCalled();
        });
    });
});
