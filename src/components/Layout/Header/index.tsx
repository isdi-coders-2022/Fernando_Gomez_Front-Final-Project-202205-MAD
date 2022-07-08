import { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { iRouterItem, iStore } from "../../../interfaces/interfaces";
import { loadRoomsAction } from "../../../reducers/room/action.creators";
import { loadUsersAction } from "../../../reducers/user/action.creators";
// import { LocalStoreService } from "../../../services/local-storage";

export function Header({navOptions}: {navOptions: iRouterItem[]}){
    const dispatcher = useDispatch();

    const navigate = useNavigate();
    const user = useSelector((store: iStore) => store.users);

    const logout = (ev: SyntheticEvent) => {
        ev.preventDefault();
        localStorage.removeItem('User');
        localStorage.removeItem('Rooms');

        dispatcher(loadUsersAction([]));
        dispatcher(loadRoomsAction([]));
        
        navigate(`/login`);
    }

    navOptions = navOptions.filter(item => item.path !== '*' ? item : '' )
    navOptions = navOptions.filter(item => item.path !== '/login' ? item : '' );
    navOptions = navOptions.filter(item => item.path !== '/room/:id' ? item : '' );
    navOptions = navOptions.filter(item => item.path !== '*' ? item : '' );
    

    return (
        <>
            <header>
                <nav>
                    <ul>
                        {
                            navOptions.map(item => 
                                <li key={item.label}>
                                    <Link to={item.path}>{item.label}</Link>
                                </li>
                                )
                        }
                    </ul>
                        <button onClick={logout} >Logout</button> 
                </nav>
            </header>
        </>
    )
}

// function dispatcher(arg0: { payload: import("../../../interfaces/interfaces").iUser[]; type: string; }) {
//     throw new Error("Function not implemented.");
// }
