import { BrowserRouter } from 'react-router-dom';
import { preloadedState, reducer } from '../../../utils/mocks';
import { render, screen } from '../../../utils/test-utils';
import {Spinner} from './spinner';

describe('Given the Spinner component', () => {
    describe('When it is called', () => {
        test('Then it should render the component', async () => {
            render(
                <BrowserRouter>
                    <Spinner />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const element = screen.getByTestId('1');
            expect(element).toBeInTheDocument();
        });
    });
   
});
