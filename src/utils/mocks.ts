import { iMessage, iRoom, iStore, iUser } from '../interfaces/interfaces';
import { groupRoomReducer } from '../reducers/group-room/reducer';
import { loggedUserReducer } from '../reducers/logged-user/reducer';
import { roomReducer } from '../reducers/room/reducer';
import { userReducer } from '../reducers/user/reducer';

export const token = 'abcd1234';

export const mockMessage: iMessage = {
    _id: '1',
    createdAt: 'date',
    sender: 'sender id',
    recipient: 'recipient id',
    content: 'content of message',
};

export const mockRoom: iRoom = {
    _id: '1',
    owner: 'id',
    name: '12',
    messages: [
        mockMessage
    ],
    users: [],
};
export const mockRoom2 = {
    _id: '2',
    owner: 'id2',
    messages: [],
    users: [],
};

export const mockUpdatedRoom = {
    _id: '1',
    messages: [],
    users: ['id1'],
};

export const mockRoomArray: iRoom[] = [mockRoom, mockRoom2];

export const mockUser: iUser = {
    _id: '1',
    email: 'string',
    password: 'string',
    token: 'string',
    name: 'name1',
    surname: 'string',
    nickname: 'nick1',
    avatar: 'string',
    createdAt: 'string',
    updatedAt: 'string',
    online: false,
    onConversation: 'string',
    rooms: [],
};

export const mockUser2: iUser = {
    ...mockUser,
    _id: '2',
    nickname: 'nick2',
};

export const mockUpdatedUser: iUser = {
    ...mockUser,
    _id: '1',
    name: 'updated',
};

export const mockUsersArray: iUser[] = [mockUser, mockUser2];

export const mockUserId = 'id';
export const mockUserId2 = 'id2';

export const reducer = {
    user: loggedUserReducer, 
    users: userReducer, 
    rooms: roomReducer,
    groupRoom: groupRoomReducer
};

export const preloadedState: iStore = {
    user: [mockUser] as iUser[],
    users: [mockUser] as iUser[],
    rooms: [mockRoom, mockRoom2] as iRoom[],
    groupRoom: [mockRoom._id] as string[],

};
