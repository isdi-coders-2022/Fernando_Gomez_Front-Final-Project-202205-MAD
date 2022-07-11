import { createReducer } from "@reduxjs/toolkit";
import { iUser } from "../../interfaces/interfaces";
import * as actions from './action.creators'


const initialState = [] as iUser[];

export const loggedUserReducer = createReducer(initialState, (builder) =>  builder
    .addCase(actions.loadLoggedUsersAction, (_state, action) => [
        ...action.payload
    ])
    .addCase(actions.addLoggedUserAction, (state, action) => [
        ...state,
        action.payload
    ])
    .addCase(actions.updateLoggedUserAction, (state, action) => 
        state.map((item) => 
            item._id === action.payload._id ? action.payload : item
        )
    )
    .addCase(actions.deleteLoggedUserAction, (state, action) => 
        state.filter(item => item._id !== action.payload._id)
    )
    .addDefaultCase(state => state)
);