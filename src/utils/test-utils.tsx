/* eslint-disable no-undef */
import {render as rtlRender} from '@testing-library/react';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { loggedUserReducer } from '../reducers/logged-user/reducer';
import { roomReducer } from '../reducers/room/reducer';
import { userReducer } from '../reducers/user/reducer';
import { groupRoomReducer } from '../reducers/group-room/reducer';


function render(
    ui: JSX.Element, 
    {preloadedState, reducer}: {
        preloadedState: {};
        reducer: {}
    }
) {
    function Wrapper({children}: {children: JSX.Element}) {
        return (
            <Provider store={configureStore({
                reducer: {
                    user: loggedUserReducer, 
                    users: userReducer, 
                    rooms: roomReducer,
                    groupRoom: groupRoomReducer
                }, preloadedState
            })}>
                {children}
            </Provider>
        )
    };
    return rtlRender(ui, {wrapper: Wrapper})
}

export * from '@testing-library/react';
export {render};