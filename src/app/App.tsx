import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { socket } from '../chat/chat-socket';
import { Layout } from '../components/Layout/layout';
import { iRoom, iRouterItem, iStore, iUser } from '../interfaces/interfaces';
import { loadLoggedUsersAction } from '../reducers/logged-user/action.creators';
import {
    addRoomAction,
    loadRoomsAction,
    updateRoomAction,
} from '../reducers/room/action.creators';
import {
    deleteUserAction,
    loadUsersAction,
    updateUserAction,
} from '../reducers/user/action.creators';
import { ApiChat } from '../services/api';
import { LocalStoreService } from '../services/local-storage';
import './App.css';

function App() {
    const localStorageService = useMemo(() => new LocalStoreService(), []);
    const loggedUser = useSelector((store: iStore) => store.user[0]);

    const dispatcher = useDispatch();
    const apiChat = useMemo(() => new ApiChat(), []);
    const navigate = useNavigate();

    socket.on('message', (payload) => {
        dispatcher(updateRoomAction(payload as iRoom));
    });

    socket.on('update-user', (payload) => {
        dispatcher(updateUserAction(payload as iUser));
        if (payload._id === localStorageService.getUser()) {
            Swal.fire(
                '',
                'Tu perfil ha sido actualizado con éxito!',
                'success'
            );
            navigate('/');
        }
    });

    socket.on('on-conversation', (payload) => {
        dispatcher(updateUserAction(payload as iUser));
    });

    socket.on('new-p2p-room', (payload: iRoom) => {
        dispatcher(addRoomAction(payload as iRoom));
    });

    socket.on('new-group-room', (payload: iRoom) => {
        dispatcher(addRoomAction(payload as iRoom));
        if (payload.owner === localStorageService.getUser()) {
            socket.emit('on-conversation', {
                userId: localStorageService.getUser(),
                token: localStorageService.getToken(),
                roomId: payload._id,
            });
            navigate(`/room/${payload._id}`);
        }
    });

    socket.on('update-seen-messages', (payload: iRoom) => {
        dispatcher(updateRoomAction(payload as iRoom));
    });

    socket.on('delete-account', (payload) => {
        if (loggedUser) {
            if (payload._id === loggedUser._id) {
                localStorage.removeItem('User');
                localStorage.removeItem('Token');

                dispatcher(deleteUserAction(payload));

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Tu cuenta ha sido eliminada!',
                    showConfirmButton: false,
                    timer: 3000,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } else {
                dispatcher(deleteUserAction(payload));
            }
        }
    });

    useEffect(() => {
        const userId: string = localStorageService.getUser();
        const token: string = localStorageService.getToken();

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
                            dispatcher(loadRoomsAction(rooms));
                            apiChat
                                .getAllUsers(userId as string, token as string)
                                .then((users) => {
                                    dispatcher(loadUsersAction(users));
                                });
                        });
                });
        }
    }, [apiChat, dispatcher, localStorageService, navigate]);

    const HomePage = React.lazy(() => import('../pages/home/home-page'));
    const LoginPage = React.lazy(() => import('../pages/login/login-page'));
    const RoomPage = React.lazy(() => import('../pages/room/room-page'));
    const GroupRoomPage = React.lazy(
        () => import('../pages/group-room/group-room')
    );
    const UsersPage = React.lazy(() => import('../pages/users/users-page'));
    const GroupRoomsPage = React.lazy(
        () => import('../pages/group-rooms/group-rooms-page')
    );
    const EditProfilePage = React.lazy(
        () => import('../pages/edit-profile/edit-profile-page')
    );
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
        {
            path: '/edit-profile',
            label: 'Edit profile',
            page: <EditProfilePage />,
        },
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
