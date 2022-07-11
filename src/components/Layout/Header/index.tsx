import { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { iRouterItem, iStore } from "../../../interfaces/interfaces";
import { loadLoggedUsersAction } from "../../../reducers/logged-user/action.creators";
import { loadRoomsAction } from "../../../reducers/room/action.creators";
import { loadUsersAction } from "../../../reducers/user/action.creators";
import styles from './index.module.css';

export function Header({navOptions}: {navOptions: iRouterItem[]}){
    const dispatcher = useDispatch();

    const navigate = useNavigate();

    const logout = (ev: SyntheticEvent) => {
        ev.preventDefault();
        localStorage.removeItem('User');

        dispatcher(loadLoggedUsersAction([]));
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
                <nav className={styles.nav}>
                    <div>
                        <ul>
                            {
                                navOptions.map(item => 
                                    <li key={item.label}>
                                        <Link to={item.path}>{item.label}</Link>
                                    </li>
                                    )
                            }
                        </ul>
                    </div>
                    <div>
                        <button onClick={logout} >Logout</button> 
                    </div>    
                </nav>
            </header>
        </>
    )
}
