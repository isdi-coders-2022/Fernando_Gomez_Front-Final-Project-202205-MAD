import * as actions from './action.creators';
import { AnyAction } from '@reduxjs/toolkit';
import { iMessage, iRoom, iUser } from '../../interfaces/interfaces';
import { userReducer } from '../user/reducer';
import { loggedUserReducer } from './reducer';

const mockMessage: iMessage = {
    sender: '',
    recipient: '',
    content: '',
}

const mockRoom: iRoom = {
    messages: [mockMessage],
    users: []
}

const mockedArray: iUser[] = [
    {
        _id: '1',
        email: 'string',
        password: 'string',
        token: 'string',
        name: 'string',
        surname: 'string',
        nickname: 'string',
        avatar: 'string',
        createdAt: 'string',
        updatedAt: 'string',
        online: false,
        onConversation: 'string',
        rooms: [mockRoom],
    },
    {
        _id: '2',
        email: 'string',
        password: 'string',
        token: 'string',
        name: 'string',
        surname: 'string',
        nickname: 'string',
        avatar: 'string',
        createdAt: 'string',
        updatedAt: 'string',
        online: false,
        onConversation: 'string',
        rooms: [mockRoom],
    },
];
describe('Given users reducer', () => {
    describe('When calling it with load action with an array of users', () => {
        test('It should return a new state with that array of users', () => {
            const newState = loggedUserReducer(
                [],
                actions.loadLoggedUsersAction(mockedArray)
            );
            expect(newState).toEqual(mockedArray);
        });
    });
    describe('When calling it with add action with a user', () => {
        test('It should return a new state with an array with that user', () => {
            const newState = loggedUserReducer(
                [],
                actions.addLoggedUserAction(mockedArray[0])
            );
            expect(newState).toEqual([mockedArray[0]]);
        });
    });
    describe('When calling it with update action with a user or partial user', () => {
        test('It should return a new state with a updated array of users', () => {
            const newState = loggedUserReducer(
                mockedArray,
                actions.updateLoggedUserAction({
                    ...mockedArray[0],
                    name: 'true',
                })
            );
            expect(newState.find((item) => item._id === '1')?.name).toBe(
                'true'
            );
        });
    });
    describe('When calling it with delete action with a user', () => {
        test('It should return a new state with an array of previous users without the deleted one', () => {
            const newState = loggedUserReducer(
                mockedArray,
                actions.deleteLoggedUserAction(mockedArray[0])
            );
            expect(newState).toEqual([mockedArray[1]]);
        });
    });
    describe('When calling it with a non related action', () => {
        test('It should return a new state equal to the previous one', () => {
            const newState = loggedUserReducer(mockedArray, {} as AnyAction);
            expect(newState).toEqual(mockedArray);
        });
    });
});
