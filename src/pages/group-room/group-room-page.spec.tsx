import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { iRoom, iRouterItem, iStore, iUser } from '../../interfaces/interfaces';
import { loggedUserReducer } from '../../reducers/logged-user/reducer';
import { roomReducer } from '../../reducers/room/reducer';
import { userReducer } from '../../reducers/user/reducer';
import {
    mockUser,
    mockUser2,
    preloadedState,
    reducer,
} from '../../utils/mocks';
import { render, screen } from '../../utils/test-utils';
import { Layout } from '../../components/Layout/layout';
import { UsersList } from '../../components/UsersList/users-list';
import GroupRoomPage from './group-room';

describe('Given the CreateGroup Page', () => {
    describe('when it is called', () => {
        test('it should be rendered', () => {
            const HomePage = React.lazy(
                () => import('../../pages/home/home-page')
            );

            const mockRouterOptions: iRouterItem[] = [
                { path: '/', label: 'Home', page: <HomePage /> },
            ];

            render(
                <BrowserRouter>
                    <Layout navOptions={mockRouterOptions}>
                        <GroupRoomPage />
                    </Layout>
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const element = screen.getByTestId('2');
            expect(element).toBeInTheDocument();
        });
    });
});
