import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { iRoom, iRouterItem, iStore, iUser } from '../interfaces/interfaces';
import { loadRoomsAction } from '../reducers/room/action.creators';
import { loadUsersAction } from '../reducers/user/action.creators';
import { ApiChat } from '../services/api';
import { UserStore } from '../services/local-storage';
import './App.css';

 function App() {
    const localStorage = new UserStore();
    const dispatcher = useDispatch();
    const apiChat = useMemo(() => new ApiChat(), []);

    // const getRooms =  () => {
    // const rooms =       apiChat.getAllRoomsByUser(us._id as string, us.token as string) ;
    // // const roomsApi = Promise.all([getRooms()])
    // return rooms;

    // }

    // const rooms = getRooms()

    // getRooms();

    // useEffect(() => {
    //     apiChat.getAllRoomsByUser().then(robots => dispatcher(loadRobotsAction(robots)));
    // }, [apiRobot, dispatcher]);


    useEffect(() => {
        const user: iUser = localStorage.getUser();
        const rooms: iRoom[] = localStorage.getRooms();
     // TODO fix this double rooms call
 
        // console.log('user del local: ', localStorage.getUser());
        console.log('user: ',user);


        dispatcher(loadUsersAction([user]));
        dispatcher(loadRoomsAction(rooms));
        
    }, [dispatcher, localStorage]);

    const HomePage = React.lazy(() => import('../pages/home'));
    const LoginPage = React.lazy(() => import('../pages/login'));
    const RoomPage = React.lazy(() => import('../pages/room'));

    const routerOptions: iRouterItem[] = [
        { path: '/', label: 'Home', page: <HomePage /> },
        { path: '/login', label: 'Login', page: <LoginPage /> },
        { path: '/room/:id', label: 'Room', page: <RoomPage /> },
        { path: '*', label: '', page: <HomePage /> },
    ]

  return (
    <Layout navOptions={routerOptions} >
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
  );
}

export default App;
