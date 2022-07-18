import { BrowserRouter } from 'react-router-dom';
import { mockMessage, preloadedState, reducer } from '../../utils/mocks';
import { render, screen } from '../../utils/test-utils';
import {RoomCard} from './room-card';

describe('Given the RoomCard component', () => {
    describe('When it is called', () => {
        test('Then it should render the component', async () => {
            render(
                <BrowserRouter>
                    <RoomCard message={mockMessage} rtype={'p2p'} />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const element = screen.getByText(/content of message/i);
            expect(element).toBeInTheDocument();
        });
    });
});
