import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { iRoom, iRouterItem, iStore, iUser } from '../../interfaces/interfaces';
import { preloadedState, reducer } from '../../utils/mocks';
import { render, screen } from '../../utils/test-utils';
import { Layout } from '../../components/Layout/layout';
import LoginPage from './login-page';

describe('Given the LoginPage ', () => {
    describe('when it is called', () => {
        test('it should be rendered', () => {
            const HomePage = React.lazy(
                () => import('../../pages/home/home-page')
            );

            const mockRouterOptions: iRouterItem[] = [
                { path: '/', label: 'Home', page: <HomePage /> },
            ];

            render(
                <BrowserRouter>
                    <Layout navOptions={mockRouterOptions}>
                        <LoginPage />
                    </Layout>
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const element = screen.getByText(/Avatar/i);
            expect(element).toBeInTheDocument();
        });
    });
});
