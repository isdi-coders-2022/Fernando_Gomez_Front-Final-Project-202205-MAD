import * as actions from './action.creators';
import { AnyAction } from '@reduxjs/toolkit';
import { roomReducer } from './reducer';
import { mockRoom2, mockRoomArray } from '../../utils/mocks';

describe('Given Room reducer', () => {
    describe('When calling it with load action with an array of Room', () => {
        test('It should return a new state with that array of Room', () => {
            const newState = roomReducer(
                [],
                actions.loadRoomsAction(mockRoomArray)
            );
            expect(newState).toEqual(mockRoomArray);
        });
    });
    describe('When calling it with add action with a Room', () => {
        test('It should return a new state with an array with that Room', () => {
            const newState = roomReducer(
                [],
                actions.addRoomAction(mockRoomArray[0])
            );
            expect(newState).toEqual([mockRoomArray[0]]);
        });
    });
    describe('When calling it with update action with a Room or a partial Room', () => {
        test('It should return a new state with an updated array of Room', () => {
            const newState = roomReducer(
                mockRoomArray,
                actions.updateRoomAction({
                    ...mockRoomArray[0],
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
                mockRoomArray,
                actions.deleteRoomAction(mockRoomArray[0])
            );
            expect(newState).toEqual([mockRoom2]);
        });
    });
    describe('When calling it with a non related action', () => {
        test('It should return a new state equal to the previous one', () => {
            const newState = roomReducer(mockRoomArray, {} as AnyAction);
            expect(newState).toEqual(mockRoomArray);
        });
    });
});
