import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { iMessage, iRoom, iStore, iUser } from '../../interfaces/interfaces';
import { loggedUserReducer } from '../../reducers/logged-user/reducer';
import { roomReducer } from '../../reducers/room/reducer';
import { userReducer } from '../../reducers/user/reducer';
import { mockUser, preloadedState, reducer } from '../../utils/mocks';
import { fireEvent, render, screen } from '../../utils/test-utils';
import {CreateGroupCard} from './create-group-card';

describe('Given the CreateGroupCard component', () => {
    describe('When it is called', () => {
        test('Then it should render the component', async () => {
            render(
                <BrowserRouter>
                    <CreateGroupCard user={mockUser} />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const element = screen.getByText(/name1/i);
            expect(element).toBeInTheDocument();
        });
    });
});
