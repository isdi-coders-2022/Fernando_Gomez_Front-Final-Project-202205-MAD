import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { iRoom, iRouterItem, iStore, iUser } from '../../../interfaces/interfaces';
import { Header } from './header';
import { loggedUserReducer } from '../../../reducers/logged-user/reducer';
import { userReducer } from '../../../reducers/user/reducer';
import { roomReducer } from '../../../reducers/room/reducer';
import { Layout } from '../layout';
import { fireEvent, render, screen } from '../../../utils/test-utils';
import { preloadedState, reducer } from '../../../utils/mocks';



describe('Given the Header component', () => {
  describe('when it is called', () => {
    test('it should be rendered', () => {

      const HomePage = React.lazy(() => import('../../../pages/home/home-page'));

      const mockRouterOptions: iRouterItem[] = [
        { path: '/', label: 'Home', page: <HomePage /> }
      ];

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
