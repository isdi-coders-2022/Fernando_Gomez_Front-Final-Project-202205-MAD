import { Link } from "react-router-dom";
import { iRouterItem } from "../../../interfaces/interfaces";

export function Header({navOptions}: {navOptions: iRouterItem[]}){

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
                </nav>
            </header>
        </>
    )
}