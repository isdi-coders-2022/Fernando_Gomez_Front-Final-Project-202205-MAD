import React from 'react';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { iRoom, iRouterItem, iStore, iUser } from '../../interfaces/interfaces';
import { Layout } from './index';
import { fireEvent, render, screen } from '../../utils/test-utils';
import { userReducer } from '../../reducers/user/reducer';
import { loggedUserReducer } from '../../reducers/logged-user/reducer';
import { roomReducer } from '../../reducers/room/reducer';

describe('Given the component Layout', () => {
  describe('when it is called', () => {
    test('should have render its children', () => {
      let MockChildren: () => JSX.Element;
      MockChildren = function () {
        return (
          <>
            <p>test</p>
          </>
        );
      };
      const HomePage = React.lazy(() => import('../../pages/home'));

      const mockRouterOptions: iRouterItem[] = [
        { path: '/', label: 'Home', page: <HomePage /> }
      ];

      const reducer = {
        user: loggedUserReducer, 
        users: userReducer, 
        rooms: roomReducer
    };
    
    const preloadedState: iStore = {
        user: [] as iUser[],
        users: [] as iUser[],
        rooms: [] as iRoom[],
    };

      render(
        <BrowserRouter>
            {/* <MemoryRouter> */}
          <Layout navOptions={mockRouterOptions}>
            <MockChildren></MockChildren>
          </Layout>
        </BrowserRouter>,
        { preloadedState, reducer }
      );
      const display = screen.getByText(/test/i);
      expect(display).toBeInTheDocument();
    });
  });
});
