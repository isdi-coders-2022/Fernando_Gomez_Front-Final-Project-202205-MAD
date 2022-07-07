import { createAction } from "@reduxjs/toolkit";
import { iRoom } from "../../interfaces/interfaces";
import { actionTypes } from "./action.types";


export const loadRoomsAction = createAction<iRoom[]>(
    actionTypes['room@load']
);

export const addRoomAction = createAction<iRoom>(
    actionTypes['room@add']
);

export const updateRoomAction = createAction<iRoom>(
    actionTypes['room@update']
);

export const deleteRoomAction = createAction<iRoom>(
    actionTypes['room@delete']
);