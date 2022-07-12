import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { iRouterItem, iUser } from '../interfaces/interfaces';
import { loadLoggedUsersAction } from '../reducers/logged-user/action.creators';
import { loadRoomsAction } from '../reducers/room/action.creators';
import { loadUsersAction } from '../reducers/user/action.creators';
import { ApiChat } from '../services/api';
import { LocalStoreService } from '../services/local-storage';
import './App.css';

 function App() {
    const localStorage = useMemo(() => new LocalStoreService(), []);
    const dispatcher = useDispatch();
    const apiChat = useMemo(() => new ApiChat(), []);
    const navigate = useNavigate();

    useEffect(() => {
        const user: iUser = localStorage.getUser();
        if(!user){
            navigate('/login');
        } 
        
        if (user){
            apiChat.getAllRoomsByUser(user._id as string, user.token as string).then(rooms => dispatcher(loadRoomsAction(rooms)));
            apiChat.getAllUsers(user._id as string, user.token as string).then(users => dispatcher(loadUsersAction(users)));
            dispatcher(loadLoggedUsersAction([user]));
        }
        
    }, [apiChat, dispatcher, localStorage, navigate]);

    const HomePage = React.lazy(() => import('../pages/home'));
    const LoginPage = React.lazy(() => import('../pages/login'));
    const RoomPage = React.lazy(() => import('../pages/room'));
    const UsersPage = React.lazy(() => import('../pages/users'));
    const SignUpPage = React.lazy(() => import('../pages/signup'));

    const routerOptions: iRouterItem[] = [
        { path: '/', label: 'Home', page: <HomePage /> },
        { path: '/login', label: 'Login', page: <LoginPage /> },
        { path: '/room/:id', label: 'Room', page: <RoomPage /> },
        { path: '/users', label: 'Users', page: <UsersPage /> },
        { path: '/signup', label: 'Sign-up', page: <SignUpPage /> },
        { path: '*', label: '', page: <HomePage /> },
    ]

  return (
    <div className='layout'>
    <Layout navOptions={routerOptions}  >
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
