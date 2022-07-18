import { BrowserRouter } from 'react-router-dom';
import { mockRoom, preloadedState, reducer } from '../../utils/mocks';
import { render, screen } from '../../utils/test-utils';
import {Card} from './card';

describe('Given the Card component', () => {
    describe('When it is called', () => {
        test('Then it should render the component', async () => {
            render(
                <BrowserRouter>
                    <Card room={mockRoom} />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const element = screen.getByText(/content of message/i);
            // screen.debug()

            expect(element).toBeInTheDocument();


        });
    });
   
});
