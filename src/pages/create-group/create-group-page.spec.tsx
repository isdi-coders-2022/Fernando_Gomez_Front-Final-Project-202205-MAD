import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { iRouterItem } from '../../interfaces/interfaces';
import { preloadedState, reducer } from '../../utils/mocks';
import { render, screen } from '../../utils/test-utils';
import { Layout } from '../../components/Layout/layout';
import CreateGroupPage from './create-group-page';

describe('Given the CreateGroup Page', () => {
  describe('when it is called', () => {
    test('it should be rendered', () => {

      const HomePage = React.lazy(() => import('../../pages/home/home-page'));

      const mockRouterOptions: iRouterItem[] = [
        { path: '/', label: 'Home', page: <HomePage /> }
      ];

      render(
        <BrowserRouter>
          <Layout navOptions={mockRouterOptions}>
            <CreateGroupPage />
          </Layout>
        </BrowserRouter>,
        { preloadedState, reducer }
      );
      const element = screen.getByText(/Crear grupo/i);
      expect(element).toBeInTheDocument();
    });
  });
});
