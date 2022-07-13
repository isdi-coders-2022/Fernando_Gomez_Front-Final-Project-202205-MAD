import React from 'react';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { iRoom, iRouterItem, iStore, iUser } from '../../../interfaces/interfaces';
import { Header } from './index';
import { fireEvent, render, screen } from '../../../utils/test-utils';
import { loggedUserReducer } from '../../../reducers/logged-user/reducer';
import { userReducer } from '../../../reducers/user/reducer';
import { roomReducer } from '../../../reducers/room/reducer';
import { Layout } from '../index';


describe('Given the Header component', () => {
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

      const HomePage = React.lazy(() => import('../../../pages/home/index'));

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
            <Header navOptions={[]} />
          </Layout>
        </BrowserRouter>,
        { preloadedState, reducer }
      );
      const display = screen.getByText(/Home/i);
      expect(display).toBeInTheDocument();
    });
  });
});
