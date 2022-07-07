import { configureStore } from "@reduxjs/toolkit";
import { iUser, iStore, iRoom } from "../interfaces/interfaces";
import { roomReducer } from "../reducers/room/reducer";
import { userReducer } from "../reducers/user/reducer";

const preloadedState: iStore = {
    users: [] as iUser[],
    rooms: [] as iRoom[],
}

export const store = configureStore({
    reducer: {users: userReducer, rooms: roomReducer},
    preloadedState
});