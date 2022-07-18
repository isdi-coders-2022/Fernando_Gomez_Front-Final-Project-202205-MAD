import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { iRoom, iRouterItem, iStore, iUser } from '../../interfaces/interfaces';
import { loggedUserReducer } from '../../reducers/logged-user/reducer';
import { roomReducer } from '../../reducers/room/reducer';
import { userReducer } from '../../reducers/user/reducer';
import { mockUser, mockUser2, preloadedState, reducer } from '../../utils/mocks';
import { render, screen } from '../../utils/test-utils';
import { Layout } from '../Layout/layout';
import { UsersList } from './users-list';



describe('Given the UsersList component', () => {
  describe('when it is called', () => {
    test('it should be rendered', () => {

      const HomePage = React.lazy(() => import('../../pages/home/home-page'));

      const mockRouterOptions: iRouterItem[] = [
        { path: '/', label: 'Home', page: <HomePage /> }
      ];

      render(
        <BrowserRouter>
          <Layout navOptions={mockRouterOptions}>
            <UsersList data={[mockUser, mockUser2]} group={true} />
          </Layout>
        </BrowserRouter>,
        { preloadedState, reducer }
      );
      const element = screen.getByText(/nick1/i);
      expect(element).toBeInTheDocument();
    });
  });
});
