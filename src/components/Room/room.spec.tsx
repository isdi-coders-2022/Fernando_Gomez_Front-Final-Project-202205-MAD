import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { socket } from '../../chat/chat-socket';
import { iRoom, iRouterItem, iStore, iUser } from '../../interfaces/interfaces';
import { loggedUserReducer } from '../../reducers/logged-user/reducer';
import { roomReducer } from '../../reducers/room/reducer';
import { userReducer } from '../../reducers/user/reducer';
import { preloadedState, reducer } from '../../utils/mocks';
import { render, screen } from '../../utils/test-utils';
import { Layout } from '../Layout/layout';
import { Room } from './room';

jest.mock('../../chat/chat-socket');

describe('Given the Room component', () => {
  describe('when it is called', () => {
    test('it should be rendered', () => {

      const HomePage = React.lazy(() => import('../../pages/home/home-page'));

      const mockRouterOptions: iRouterItem[] = [
        { path: '/', label: 'Home', page: <HomePage /> }
      ];

      render(
        <BrowserRouter>
          <Layout navOptions={mockRouterOptions}>
            <Room roomId={'id'} data={[]} />
          </Layout>
        </BrowserRouter>,
        { preloadedState, reducer }
      );
      const element = screen.getByTestId('room');
        expect(element).toBeInTheDocument();
    });
  });

  describe('When calling the socket.on function', () => {
    test('It should access the socket.on function', () => {
        socket.on = jest.fn().mockResolvedValue('result');
        render(
            <BrowserRouter>
                <Room roomId={'id'} data={[]} />
            </BrowserRouter>,
            { preloadedState, reducer }
        );

        expect(socket.on).toHaveBeenCalled();
    });
});
});
