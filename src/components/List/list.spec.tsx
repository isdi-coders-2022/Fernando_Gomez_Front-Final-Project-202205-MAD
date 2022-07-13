import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { iRoom, iRouterItem, iStore, iUser } from '../../interfaces/interfaces';
import { loggedUserReducer } from '../../reducers/logged-user/reducer';
import { roomReducer } from '../../reducers/room/reducer';
import { userReducer } from '../../reducers/user/reducer';
import { render, screen } from '../../utils/test-utils';
import { Layout } from '../Layout';
import { List } from './index';



describe('Given the List component', () => {
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
        rooms: [] as iRoom[],
    };

      render(
        <BrowserRouter>
          <Layout navOptions={mockRouterOptions}>
            <List data={[]} />
          </Layout>
        </BrowserRouter>,
        { preloadedState, reducer }
      );
      const element = screen.getByTestId('1');
      expect(element).toBeInTheDocument();
    });
  });
});
