import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { iMessage, iRoom, iStore, iUser } from '../../../interfaces/interfaces';
import { loggedUserReducer } from '../../../reducers/logged-user/reducer';
import { roomReducer } from '../../../reducers/room/reducer';
import { userReducer } from '../../../reducers/user/reducer';
import { preloadedState, reducer } from '../../../utils/mocks';
// import { iMessage, iRoom, iStore, iUser } from '../../interfaces/interfaces';
// import { loggedUserReducer } from '../../reducers/logged-user/reducer';
// import { roomReducer } from '../../reducers/room/reducer';
// import { userReducer } from '../../reducers/user/reducer';
import { fireEvent, render, screen } from '../../../utils/test-utils';
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
