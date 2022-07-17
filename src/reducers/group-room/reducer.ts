import { createReducer } from "@reduxjs/toolkit";
import * as actions from './action.creators'


const initialState = [] as string[];

export const groupRoomReducer = createReducer(initialState, (builder) =>  builder
    .addCase(actions.loadGroupUsersAction, (_state, action) => [
        ...action.payload
    ])
    .addCase(actions.addGroupUserAction, (state, action) => [
        ...state,
        action.payload
    ])
    .addCase(actions.deleteGroupUserAction, (state, action) => 
        state.filter(item => item !== action.payload)
    )
    .addDefaultCase(state => state)
);