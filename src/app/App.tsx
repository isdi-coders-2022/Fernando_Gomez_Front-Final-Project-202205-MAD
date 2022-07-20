import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { socket } from '../chat/chat-socket';
import { Layout } from '../components/Layout/layout';
import { iRoom, iRouterItem, iUser } from '../interfaces/interfaces';
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
    const localStorage = useMemo(() => new LocalStoreService(), []);

    const dispatcher = useDispatch();
    const apiChat = useMemo(() => new ApiChat(), []);
    const navigate = useNavigate();

    socket.on('message', (payload) => {
        dispatcher(updateRoomAction(payload as iRoom));
    })

    socket.on('update-user', (payload) => {
        dispatcher(updateUserAction(payload as iUser));
    })

    socket.on('on-conversation', (payload) => {
        dispatcher(updateUserAction(payload as iUser));
    })

    socket.on('new-p2p-room', (payload: iRoom) => {
        dispatcher(addRoomAction(payload as iRoom));
    })

    socket.on('new-group-room', (payload: iRoom) => {
        dispatcher(addRoomAction(payload as iRoom));
        if (payload.owner === localStorage.getUser()){
            socket.emit('on-conversation', {
                userId: localStorage.getUser(),
                token: localStorage.getToken(),
                roomId: payload._id
            })
            navigate(`/room/${payload._id}`);
        }
       
    });

    socket.on('update-seen-messages', (payload: iRoom) => {
        dispatcher(updateRoomAction(payload as iRoom));
    });

    socket.on('delete-account', (payload) => {
        if(!!localStorage.getUser()) {
            if(payload._id !== localStorage.getUser()){
        
                dispatcher(updateUserAction(payload));
            }
        } 
        

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
                        dispatcher(loadRoomsAction(rooms))
                        apiChat
                        .getAllUsers(userId as string, token as string)
                        .then((users) => {
                            dispatcher(loadUsersAction(users))
                        });
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
        () => import('../pages/create-group/create-group-page')
    );

    const routerOptions: iRouterItem[] = [
        { path: '/', label: 'Inicio', page: <HomePage /> },
        { path: '/login', label: 'Login', page: <LoginPage /> },
        { path: '/room/:id', label: 'Room', page: <RoomPage /> },
        {
            path: '/group-room/:id',
            label: 'Group Room',
            page: <GroupRoomPage />,
        },
        { path: '/users', label: 'Contactos', page: <UsersPage /> },
        { path: '/group-rooms', label: 'Grupos', page: <GroupRoomsPage /> },
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
