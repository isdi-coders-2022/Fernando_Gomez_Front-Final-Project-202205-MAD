import { BrowserRouter } from 'react-router-dom';
import { preloadedState, reducer } from '../../../utils/mocks';
import { render, screen } from '../../../utils/test-utils';
import {Footer} from './footer';

describe('Given the Footer component', () => {
    describe('When it is called', () => {
        test('Then it should render the component', async () => {
            render(
                <BrowserRouter>
                    <Footer />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const element = screen.getByText(/Footer/i);
            expect(element).toBeInTheDocument();
        });
    });
   
});
