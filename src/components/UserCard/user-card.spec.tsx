import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { iMessage, iRoom, iStore, iUser } from '../../interfaces/interfaces';
import { loggedUserReducer } from '../../reducers/logged-user/reducer';
import { roomReducer } from '../../reducers/room/reducer';
import { userReducer } from '../../reducers/user/reducer';
import { fireEvent, render, screen } from '../../utils/test-utils';
import {UserCard} from './index';

const mockUser: iUser = {
    _id: '1',
    email: 'string',
    password: 'string',
    token: 'string',
    name: 'string',
    surname: 'string',
    nickname: 'pepe',
    avatar: 'string',
    createdAt: 'string',
    updatedAt: 'string',
    online: false,
    onConversation: 'string',
    rooms: [],
};

const reducer = {
    user: loggedUserReducer, 
    users: userReducer, 
    rooms: roomReducer
};

const preloadedState: iStore = {
    user: [mockUser] as iUser[],
    users: [] as iUser[],
    rooms: [] as iRoom[],
};

describe('Given the UserCard component', () => {
    describe('When it is called', () => {
        test('Then it should render the component', async () => {
            render(
                <BrowserRouter>
                    <UserCard user={mockUser} />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const element = screen.getByText(/pepe/i);
            expect(element).toBeInTheDocument();
        });
    });
});
