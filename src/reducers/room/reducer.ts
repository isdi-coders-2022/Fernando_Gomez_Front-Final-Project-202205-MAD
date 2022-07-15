import { createReducer } from "@reduxjs/toolkit";
import { iRoom } from "../../interfaces/interfaces";
import * as actions from './action.creators'


const initialState = [] as iRoom[];

export const roomReducer = createReducer(initialState, (builder) =>  builder
    .addCase(actions.loadRoomsAction, (_state, action) => [
        ...action.payload
    ])
    .addCase(actions.addRoomAction, (state, action) => {
        return (state.some(room => room._id === action.payload._id)) ? state : [
            ...state,
        action.payload
        ]
    }     
    )
    .addCase(actions.updateRoomAction, (state, action) => 
        state.map((item) => 
            item._id === action.payload._id ? action.payload : item
        )
    )
    .addCase(actions.deleteRoomAction, (state, action) => 
        state.filter(item => item._id !== action.payload._id)
    )
    .addDefaultCase(state => state)
);