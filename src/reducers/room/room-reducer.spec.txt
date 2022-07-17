import * as actions from './action.creators';
import { AnyAction } from '@reduxjs/toolkit';
import { iRoom } from '../../interfaces/interfaces';
import { roomReducer } from './reducer';

const mockRoom: iRoom = {
    _id: '1',
    messages: [],
    users: []
}
const mockRoom2 = {
    _id: '2',
    messages: [],
    users: []
}

const mockUpdatedRoom = {
    _id: '1',
    messages: [],
    users: ['id1']
}

const mockedArray: iRoom[] = [
    mockRoom,
    mockRoom2
];

// const mockUser: iUser = {
//     _id: '1',
//     email: 'string',
//     password: 'string',
//     token: 'string',
//     name: 'string',
//     surname: 'string',
//     nickname: 'string',
//     avatar: 'string',
//     createdAt: 'string',
//     updatedAt: 'string',
//     online: false,
//     onConversation: 'string',
//     rooms: [],
// }



describe('Given Room reducer', () => {
    describe('When calling it with load action with an array of Room', () => {
        test('It should return a new state with that array of Room', () => {
            const newState = roomReducer(
                [],
                actions.loadRoomsAction(mockedArray)
            );
            expect(newState).toEqual(mockedArray);
        });
    });
    describe('When calling it with add action with a Room', () => {
        test('It should return a new state with an array with that Room', () => {
            const newState = roomReducer(
                [],
                actions.addRoomAction(mockedArray[0])
            );
            expect(newState).toEqual([mockedArray[0]]);
        });
    });
    describe('When calling it with update action with a Room or a partial Room', () => {
        test('It should return a new state with an updated array of Room', () => {
            const newState = roomReducer(
                mockedArray,
                actions.updateRoomAction({
                    ...mockedArray[0],
                    users: ['updated']
                })
            );
            expect(newState.find((item) => item._id === '1')?.users).toEqual(
                ['updated']
            );
        });
    });
    describe('When calling it with delete action with a Room', () => {
        test('It should return a new state with an array of previous Room without the deleted one', () => {
            const newState = roomReducer(
                mockedArray,
                actions.deleteRoomAction(mockedArray[0])
            );
            expect(newState).toEqual([mockRoom2]);
        });
    });
    describe('When calling it with a non related action', () => {
        test('It should return a new state equal to the previous one', () => {
            const newState = roomReducer(mockedArray, {} as AnyAction);
            expect(newState).toEqual(mockedArray);
        });
    });
});
