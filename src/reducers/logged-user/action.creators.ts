import { createAction } from "@reduxjs/toolkit";
import { iUser } from "../../interfaces/interfaces";
import { actionTypes } from "./action.types";


export const loadLoggedUsersAction = createAction<iUser[]>(
    actionTypes['loggedUser@load']
);

export const addLoggedUserAction = createAction<iUser>(
    actionTypes['loggedUser@add']
);

export const updateLoggedUserAction = createAction<iUser>(
    actionTypes['loggedUser@update']
);

export const deleteLoggedUserAction = createAction<iUser>(
    actionTypes['loggedUser@delete']
);