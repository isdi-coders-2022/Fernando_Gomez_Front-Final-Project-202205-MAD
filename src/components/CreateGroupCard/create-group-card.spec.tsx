import { BrowserRouter } from 'react-router-dom';
import { mockUser, preloadedState, reducer } from '../../utils/mocks';
import { render, screen } from '../../utils/test-utils';
import {CreateGroupCard} from './create-group-card';

describe('Given the CreateGroupCard component', () => {
    describe('When it is called', () => {
        test('Then it should render the component', async () => {
            render(
                <BrowserRouter>
                    <CreateGroupCard user={mockUser} />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const element = screen.getByText(/nick1/i);
            expect(element).toBeInTheDocument();
        });
    });
});
