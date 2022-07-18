import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { iMessage, iRoom, iStore, iUser } from '../../interfaces/interfaces';
import { loggedUserReducer } from '../../reducers/logged-user/reducer';
import { roomReducer } from '../../reducers/room/reducer';
import { userReducer } from '../../reducers/user/reducer';
import { mockMessage, preloadedState, reducer } from '../../utils/mocks';
import { fireEvent, render, screen } from '../../utils/test-utils';
import {RoomCard} from './room-card';

describe('Given the RoomCard component', () => {
    describe('When it is called', () => {
        test('Then it should render the component', async () => {
            render(
                <BrowserRouter>
                    <RoomCard message={mockMessage} />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const element = screen.getByText(/content of message/i);
            expect(element).toBeInTheDocument();
        });
    });
});
