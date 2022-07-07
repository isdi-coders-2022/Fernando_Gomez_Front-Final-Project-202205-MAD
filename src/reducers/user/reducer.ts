import { createReducer } from "@reduxjs/toolkit";
import { iUser } from "../../interfaces/interfaces";
import * as actions from './action.creators'


const initialState = [] as iUser[];

export const userReducer = createReducer(initialState, (builder) =>  builder
    .addCase(actions.loadUsersAction, (_state, action) => [
        ...action.payload
    ])
    .addCase(actions.addUserAction, (state, action) => [
        ...state,
        action.payload
    ])
    .addCase(actions.updateUserAction, (state, action) => 
        state.map((item) => 
            item._id === action.payload._id ? action.payload : item
        )
    )
    .addCase(actions.deleteUserAction, (state, action) => 
        state.filter(item => item._id !== action.payload._id)
    )
    .addDefaultCase(state => state)
);