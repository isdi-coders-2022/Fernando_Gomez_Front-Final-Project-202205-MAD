import { iRoom, iUser } from "../interfaces/interfaces";

export const mockRoom: iRoom = {
    _id: '1',
    messages: [],
    users: []
}
export const mockRoom2 = {
    _id: '2',
    messages: [],
    users: []
}

export const mockUpdatedRoom = {
    _id: '1',
    messages: [],
    users: ['id1']
}

export const mockRoomArray: iRoom[] = [
    mockRoom,
    mockRoom2
];

export const mockUser: iUser = {
    _id: '1',
    email: 'string',
    password: 'string',
    token: 'string',
    name: 'string',
    surname: 'string',
    nickname: 'nick1',
    avatar: 'string',
    createdAt: 'string',
    updatedAt: 'string',
    online: false,
    onConversation: 'string',
    rooms: [],
}

export const mockUser2: iUser = {
    ...mockUser, _id: '2', nickname: 'nick2'
}

export const mockUsersArray: iUser[] = [
    mockUser, mockUser2
]