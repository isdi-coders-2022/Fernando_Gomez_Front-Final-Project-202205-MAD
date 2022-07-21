import * as actions from './action.creators';
import { AnyAction } from '@reduxjs/toolkit';
import { groupRoomReducer } from './reducer';
import { mockUserId, mockUserId2 } from '../../utils/mocks';

describe('Given GroupRoom reducer', () => {
    describe('When calling it with load action with an array of users ids', () => {
        test('It should return a new state with that array of users ids', () => {
            const newState = groupRoomReducer(
                [],
                actions.loadGroupUsersAction([mockUserId])
            );
            expect(newState).toEqual([mockUserId]);
        });
    });
    describe('When calling it with add action with a user id', () => {
        test('It should return a new state with an array containing that user id', () => {
            const newState = groupRoomReducer(
                [],
                actions.addGroupUserAction(mockUserId)
            );
            expect(newState).toEqual([mockUserId]);
        });
    });
    
    describe('When calling it with delete action with an user id', () => {
        test('It should return a new state with an array of previous Room without the deleted one', () => {
            const newState = groupRoomReducer(
                [mockUserId, mockUserId2],
                actions.deleteGroupUserAction(mockUserId2)
            );
            expect(newState).toEqual([mockUserId]);
        });
    });
    describe('When calling it with a non related action', () => {
        test('It should return a new state equal to the previous one', () => {
            const newState = groupRoomReducer([mockUserId, mockUserId2], {} as AnyAction);
            expect(newState).toEqual([mockUserId, mockUserId2]);
        });
    });
});
