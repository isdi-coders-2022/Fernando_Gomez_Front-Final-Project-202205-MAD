import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { iRoom, iRouterItem, iStore, iUser } from '../../interfaces/interfaces';
import { loggedUserReducer } from '../../reducers/logged-user/reducer';
import { roomReducer } from '../../reducers/room/reducer';
import { userReducer } from '../../reducers/user/reducer';
import { render, screen } from '../../utils/test-utils';



describe('Given the HomePage component', () => {
  describe('when it is called', () => {
    test('it should be rendered', () => {

        const mockUser: iUser = {
            _id: '1',
            email: 'string',
            password: 'string',
            token: 'string',
            name: 'string',
            surname: 'string',
            nickname: 'pepe',
            avatar: 'string',
            createdAt: 'string',
            updatedAt: 'string',
            online: false,
            onConversation: 'string',
            rooms: [],
        };

        const mockRoom: iRoom = {
            _id: '1',
            messages: [],
            users: []
        }
        const mockRoom2 = {
            _id: '2',
            messages: [],
            users: []
        }

      const HomePage = React.lazy(() => import('../../pages/home/index'));

      const mockRouterOptions: iRouterItem[] = [
        { path: '/', label: 'Home', page: <HomePage /> }
      ];

      const reducer = {
        user: loggedUserReducer, 
        users: userReducer, 
        rooms: roomReducer
    };
    
    const preloadedState: iStore = {
        user: [mockUser] as iUser[],
        users: [] as iUser[],
        rooms: [mockRoom, mockRoom2] as iRoom[],
    };

      render(
        <BrowserRouter>
          <Layout navOptions={mockRouterOptions}>
            <HomePage />
          </Layout>
        </BrowserRouter>,
        { preloadedState, reducer }
      );
      screen.debug()
      const element = screen.getByText(/Conversaciones/i)
        expect(element).toBeInTheDocument();
    });
  });
});
