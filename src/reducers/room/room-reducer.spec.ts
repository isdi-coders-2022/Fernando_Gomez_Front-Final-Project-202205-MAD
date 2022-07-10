import * as actions from './action.creators';
import { AnyAction } from '@reduxjs/toolkit';
import { iRoom } from '../../interfaces/interfaces';
import { roomReducer } from './reducer';

const mockMessage = {
    _id: '1',
    id: 'string',
    room: 'string',
    sender: 'string',
    recipient: 'string',
    content: 'string',
    createdAt: 'string',
    type: 'string',
}

// const mockedArray: iRoom[] = [
//     {
//         _id: '1',
//         id: 'string',
//         name: 'string',
//         users: ['dfd', 'dfdf'],
//         messages: [mockMessage, mockMessage],
//         image: 'string',
//         createdAt: 'string',
//         type: 'string',
//     },
//     {
//         _id: '2',
//         id: 'string',
//         name: 'string',
//         users: ['dfd', 'dfdf'],
//         messages: [mockMessage, mockMessage],
//         image: 'string',
//         createdAt: 'string',
//         type: 'string',
//     },
// ];



// describe('Given Room reducer', () => {
//     describe('When calling it with load action with an array of Room', () => {
//         test('It should return a new state with that array of Room', () => {
//             const newState = roomReducer(
//                 [],
//                 actions.loadRoomsAction(mockedArray)
//             );
//             expect(newState).toEqual(mockedArray);
//         });
//     });
//     describe('When calling it with add action with a Room', () => {
//         test('It should return a new state with an array with that Room', () => {
//             const newState = roomReducer(
//                 [],
//                 actions.addRoomAction(mockedArray[0])
//             );
//             expect(newState).toEqual([mockedArray[0]]);
//         });
//     });
//     describe('When---- calling it with update action with a Room or partial Room', () => {
//         test('It should return a new state with an updated array of Room', () => {
//             const newState = roomReducer(
//                 mockedArray,
//                 actions.updateRoomAction({
//                     ...mockedArray[0],
//                     name: 'updated name',
//                 })
//             );
//             expect(newState.find((item) => item._id === '1')?.name).toBe(
//                 'updated name'
//             );
//         });
//     });
//     describe('When calling it with delete action with a Room', () => {
//         test('It should return a new state with an array of previous Room without the deleted one', () => {
//             const newState = roomReducer(
//                 mockedArray,
//                 actions.deleteRoomAction(mockedArray[0])
//             );
//             expect(newState).toEqual([mockedArray[1]]);
//         });
//     });
//     describe('When calling it with a non related action', () => {
//         test('It should return a new state equal to the previous one', () => {
//             const newState = roomReducer(mockedArray, {} as AnyAction);
//             expect(newState).toEqual(mockedArray);
//         });
//     });
// });
