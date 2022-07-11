import { configureStore } from "@reduxjs/toolkit";
import { iUser, iStore, iRoom } from "../interfaces/interfaces";
import { loggedUserReducer } from "../reducers/logged-user/reducer";
import { roomReducer } from "../reducers/room/reducer";
import { userReducer } from "../reducers/user/reducer";

const preloadedState: iStore = {
    user: [] as iUser[],
    users: [] as iUser[],
    rooms: [] as iRoom[],
}

export const store = configureStore({
    reducer: {user: loggedUserReducer, users: userReducer, rooms: roomReducer},
    preloadedState
});