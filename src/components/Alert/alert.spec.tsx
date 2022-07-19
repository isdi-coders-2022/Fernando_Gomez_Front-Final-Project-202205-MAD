import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { preloadedState, reducer } from '../../utils/mocks';
import { fireEvent, render, screen } from '../../utils/test-utils';
import {Alert} from './alert';

describe('Given the Alert component', () => {
    describe('When it is called', () => {
        test('Then it should render the component', async () => {
            render(
                <BrowserRouter>
                    <Alert id={'id'} token={'token'} />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const element = screen.getByText(/fgfgf/i);
            expect(element).toBeInTheDocument();
        });
    });
   
});
