import * as actions from './action.creators';
import { AnyAction } from '@reduxjs/toolkit';
import { loggedUserReducer } from './reducer';
import { mockUsersArray } from '../../utils/mocks';

describe('Given users reducer', () => {
    describe('When calling it with load action with an array of users', () => {
        test('It should return a new state with that array of users', () => {
            const newState = loggedUserReducer(
                [],
                actions.loadLoggedUsersAction(mockUsersArray)
            );
            expect(newState).toEqual(mockUsersArray);
        });
    });
    describe('When calling it with add action with a user', () => {
        test('It should return a new state with an array with that user', () => {
            const newState = loggedUserReducer(
                [],
                actions.addLoggedUserAction(mockUsersArray[0])
            );
            expect(newState).toEqual([mockUsersArray[0]]);
        });
    });
    describe('When calling it with update action with a user or partial user', () => {
        test('It should return a new state with a updated array of users', () => {
            const newState = loggedUserReducer(
                mockUsersArray,
                actions.updateLoggedUserAction({
                    ...mockUsersArray[0],
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
                mockUsersArray,
                actions.deleteLoggedUserAction(mockUsersArray[0])
            );
            expect(newState).toEqual([mockUsersArray[1]]);
        });
    });
    describe('When calling it with a non related action', () => {
        test('It should return a new state equal to the previous one', () => {
            const newState = loggedUserReducer(mockUsersArray, {} as AnyAction);
            expect(newState).toEqual(mockUsersArray);
        });
    });
});
