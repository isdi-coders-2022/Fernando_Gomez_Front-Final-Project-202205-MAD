import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { iMessage, iRoom, iStore, iUser } from '../../interfaces/interfaces';
import { loggedUserReducer } from '../../reducers/logged-user/reducer';
import { roomReducer } from '../../reducers/room/reducer';
import { userReducer } from '../../reducers/user/reducer';
import { fireEvent, render, screen } from '../../utils/test-utils';
import {Card} from './index';

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
const mockMessage: iMessage = {
    _id: "",
createdAt: "2022-07-12T07:23:37.769Z",
sender: "62cad2ebc32835e32432a548",
recipient: 'erer',
content: "contenido del mensaje",
type: "p2p",
}

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

const mockRoom: iRoom = {
    _id: '1',
    messages: [mockMessage, mockMessage],
    users: ['id1', 'id2']
}



describe('Given the Card component', () => {
    describe('When it is called', () => {
        test('Then it should render the component', async () => {
            render(
                <BrowserRouter>
                    <Card room={mockRoom} />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const element = screen.getByText(/contenido del mensaje/i);
            // screen.debug()

            expect(element).toBeInTheDocument();


        });
    });
   
});
