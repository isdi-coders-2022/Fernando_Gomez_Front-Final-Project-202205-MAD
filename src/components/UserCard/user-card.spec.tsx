import { BrowserRouter } from 'react-router-dom';
import { mockUser, preloadedState, reducer } from '../../utils/mocks';
import { render, screen } from '../../utils/test-utils';
import {UserCard} from './user-card';

describe('Given the UserCard component', () => {
    describe('When it is called', () => {
        test('Then it should render the component', async () => {
            render(
                <BrowserRouter>
                    <UserCard user={mockUser} />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const element = screen.getByText(/nick1/i);
            expect(element).toBeInTheDocument();
        });
    });
});
