import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { iRoom, iRouterItem, iStore, iUser } from '../../interfaces/interfaces';
import { mockUser, mockUser2, preloadedState, reducer } from '../../utils/mocks';
import { render, screen } from '../../utils/test-utils';
import { Layout } from '../../components/Layout/layout';
import RoomPage from './room-page';

describe('Given the RoomPage', () => {
  describe('when it is called', () => {
    test('it should be rendered', () => {

      const HomePage = React.lazy(() => import('../../pages/home/home-page'));

      const mockRouterOptions: iRouterItem[] = [
        { path: '/', label: 'Home', page: <HomePage /> }
      ];

      render(
        <BrowserRouter>
          <Layout navOptions={mockRouterOptions}>
            <RoomPage />
          </Layout>
        </BrowserRouter>,
        { preloadedState, reducer }
      );
      const element = screen.getByTestId('2');
            expect(element).toBeInTheDocument();
    });
  });
});
