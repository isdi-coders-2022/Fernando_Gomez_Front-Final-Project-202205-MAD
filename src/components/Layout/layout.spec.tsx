import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { iRouterItem } from '../../interfaces/interfaces';
import { Layout } from './layout';
import { render, screen } from '../../utils/test-utils';
import { preloadedState, reducer } from '../../utils/mocks';

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
      const HomePage = React.lazy(() => import('../../pages/home/home-page'));

      const mockRouterOptions: iRouterItem[] = [
        { path: '/', label: 'Home', page: <HomePage /> }
      ];

      render(
        <BrowserRouter>
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
