import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { iRouterItem } from '../../../interfaces/interfaces';
import { Header } from './header';
import { Layout } from '../layout';
import {  render, screen } from '../../../utils/test-utils';
import { preloadedState, reducer } from '../../../utils/mocks';
import { socket } from '../../../chat/chat-socket';

jest.mock('../../../chat/chat-socket');

describe('Given the Header component', () => {
    beforeEach(() => {
        socket.emit = jest.fn();

    })
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
