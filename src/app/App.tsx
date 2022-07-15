import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { socket } from '../chat/chat-socket';
import { Layout } from '../components/Layout';
import { iRoom, iRouterItem, iStore, iUser } from '../interfaces/interfaces';
import { addGroupUserAction } from '../reducers/group-room/action.creators';
import { loadLoggedUsersAction } from '../reducers/logged-user/action.creators';
import {
    addRoomAction,
    loadRoomsAction,
    updateRoomAction,
} from '../reducers/room/action.creators';
import { loadUsersAction } from '../reducers/user/action.creators';
import { ApiChat } from '../services/api';
import { LocalStoreService } from '../services/local-storage';
import './App.css';

function App() {
    const localStorage = useMemo(() => new LocalStoreService(), []);
    const loggedUser = useSelector((store: iStore) => store.user[0]);
    const dispatcher = useDispatch();
    const apiChat = useMemo(() => new ApiChat(), []);
    const navigate = useNavigate();

    // socket.on('new-group-room', (payload: iRoom) => {
    //     console.log(payload);
    //     dispatcher(addRoomAction(payload as iRoom));
    //     // if (payload.users[0] === loggedUser._id){
    //     //     navigate(`/room/${payload._id}`);
    //     // }
    // })

    socket.on('message', (payload) => {
        const updatedRoom = payload
        dispatcher(updateRoomAction(updatedRoom as iRoom));
    })

    useEffect(() => {
        const user: iUser = localStorage.getUser();
        if (!user) {
            navigate('/login');
        }
        if (user) {
            apiChat
                .getAllRoomsByUser(user._id as string, user.token as string)
                .then((rooms) => dispatcher(loadRoomsAction(rooms)));
            apiChat
                .getAllUsers(user._id as string, user.token as string)
                .then((users) => dispatcher(loadUsersAction(users)));
            dispatcher(loadLoggedUsersAction([user]));
            // dispatcher(addGroupUserAction(user._id as string));
        }
    }, [apiChat, dispatcher, localStorage, navigate]);

    const HomePage = React.lazy(() => import('../pages/home/home-page'));
    const LoginPage = React.lazy(() => import('../pages/login'));
    const RoomPage = React.lazy(() => import('../pages/room'));
    const GroupRoomPage = React.lazy(
        () => import('../pages/group-room/group-room')
    );
    const UsersPage = React.lazy(() => import('../pages/users/users-page'));
    const CreateGroupPage = React.lazy(
        () => import('../pages/create-group/create-group')
    );

    const routerOptions: iRouterItem[] = [
        { path: '/', label: 'Home', page: <HomePage /> },
        { path: '/login', label: 'Login', page: <LoginPage /> },
        { path: '/room/:id', label: 'Room', page: <RoomPage /> },
        {
            path: '/group-room/:id',
            label: 'Group Room',
            page: <GroupRoomPage />,
        },
        { path: '/users', label: 'Users', page: <UsersPage /> },
        {
            path: '/create-group',
            label: 'Create group',
            page: <CreateGroupPage />,
        },
        { path: '*', label: '', page: <HomePage /> },
    ];

    return (
        <div className="layout">
            <Layout navOptions={routerOptions}>
                <React.Suspense>
                    <Routes>
                        {routerOptions.map((item) => (
                            <Route
                                key={item.label}
                                path={item.path}
                                element={item.page}
                            ></Route>
                        ))}
                    </Routes>
                </React.Suspense>
            </Layout>
        </div>
    );
}

export default App;
function setUpdate(arg0: string) {
    throw new Error('Function not implemented.');
}
