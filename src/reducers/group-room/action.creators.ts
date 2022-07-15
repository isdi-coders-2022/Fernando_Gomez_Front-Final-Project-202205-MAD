import { createAction } from "@reduxjs/toolkit";
import { iUser } from "../../interfaces/interfaces";
import { actionTypes } from "./action.types";


export const loadGroupUsersAction = createAction<string[]>(
    actionTypes['groupRoom@load']
);

export const addGroupUserAction = createAction<string>(
    actionTypes['groupRoom@add']
);

export const deleteGroupUserAction = createAction<string>(
    actionTypes['groupRoom@delete']
);