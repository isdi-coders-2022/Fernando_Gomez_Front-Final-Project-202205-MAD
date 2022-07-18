import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from '../../components/Layout/layout';
import { iRoom, iRouterItem, iStore, iUser } from '../../interfaces/interfaces';
import HomePage from '../../pages/home/home-page';
import { preloadedState, reducer } from '../../utils/mocks';
import { render, screen } from '../../utils/test-utils';

describe('Given the HomePage component', () => {
    describe('when it is called', () => {
        test('it should be rendered', async () => {
            const LoginPage = React.lazy(
                () => import('../../pages/login/login-page')
            );

            const mockRouterOptions: iRouterItem[] = [
                { path: '/', label: 'Home', page: <LoginPage /> },
            ];

            render(
                <BrowserRouter>
                    <Layout navOptions={mockRouterOptions}>
                        <HomePage />
                    </Layout>
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            const element = screen.getByTestId('2');
            expect(element).toBeInTheDocument();
        });
    });
});