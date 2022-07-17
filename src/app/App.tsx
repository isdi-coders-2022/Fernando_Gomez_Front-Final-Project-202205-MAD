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
import { loadUsersAction, updateUserAction } from '../reducers/user/action.creators';
import { ApiChat } from '../services/api';
import { LocalStoreService } from '../services/local-storage';
import './App.css';

function App() {
    // TODO login and register forms seems to cross over when insert data in login and try to access to register
    const localStorage = useMemo(() => new LocalStoreService(), []);
    const loggedUser = useSelector((store: iStore) => store.user[0]);
    const dispatcher = useDispatch();
    const apiChat = useMemo(() => new ApiChat(), []);
    const navigate = useNavigate();

    socket.on('message', (payload) => {
        dispatcher(updateRoomAction(payload as iRoom));
    })

    socket.on('update-user', (payload) => {
        dispatcher(updateUserAction(payload as iUser));
    })

    useEffect(() => {
        const userId: string = localStorage.getUser();
        const token: string = localStorage.getToken();

        if (!userId || !token) {
            navigate('/login');
        }
        if (userId) {
            apiChat
                .getUserbyId(userId as string, token as string)
                .then((user) => {
                    dispatcher(loadLoggedUsersAction([user]));
                    apiChat
                    .getAllRoomsByUser(userId as string, token as string)
                    .then((rooms) => {
                        apiChat
                        .getAllUsers(userId as string, token as string)
                        .then((users) => dispatcher(loadUsersAction(users)));
                    });

                });
        }
    }, [apiChat, dispatcher, localStorage, navigate]);

    const HomePage = React.lazy(() => import('../pages/home/home-page'));
    const LoginPage = React.lazy(() => import('../pages/login/login-page'));
    const RoomPage = React.lazy(() => import('../pages/room/room-page'));
    const GroupRoomPage = React.lazy(
        () => import('../pages/group-room/group-room')
    );
    const UsersPage = React.lazy(() => import('../pages/users/users-page'));
    const GroupRoomsPage = React.lazy(() => import('../pages/group-rooms/group-rooms-page'));
    const EditProfilePage = React.lazy(() => import('../pages/edit-profile/edit-profile-page'));
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
        { path: '/group-rooms', label: 'Groups', page: <GroupRoomsPage /> },
        { path: '/edit-profile', label: 'Edit profile', page: <EditProfilePage /> },
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
