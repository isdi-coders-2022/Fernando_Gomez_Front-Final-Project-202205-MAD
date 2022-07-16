import { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { iRouterItem, iStore } from '../../../interfaces/interfaces';
import { loadLoggedUsersAction } from '../../../reducers/logged-user/action.creators';
import { loadRoomsAction } from '../../../reducers/room/action.creators';
import { loadUsersAction } from '../../../reducers/user/action.creators';
import styles from './index.module.css';

export function Header({ navOptions }: { navOptions: iRouterItem[] }) {
    const user = useSelector((store: iStore) => store.user[0]);

    const dispatcher = useDispatch();

    const navigate = useNavigate();

    const logout = (ev: SyntheticEvent) => {
        ev.preventDefault();
        localStorage.removeItem('User');

        dispatcher(loadLoggedUsersAction([]));
        dispatcher(loadUsersAction([]));
        dispatcher(loadRoomsAction([]));

        navigate(`/login`);
    };

    navOptions = navOptions.filter((item) => (item.path !== '*' ? item : ''));
    navOptions = navOptions.filter((item) =>
        item.path !== '/login' ? item : ''
    );
    navOptions = navOptions.filter((item) =>
        item.path !== '/room/:id' ? item : ''
    );
    navOptions = navOptions.filter((item) =>
        item.path !== '/create-group' ? item : ''
    );
    navOptions = navOptions.filter((item) =>
        item.path !== '/group-room/:id' ? item : ''
    );
    navOptions = navOptions.filter((item) => (item.path !== '*' ? item : ''));

    const openModal = () => {
        console.log('object');
        document.querySelector('#drop-menu')?.classList.remove(`${styles.d_none}`);
        document.querySelector('#drop-menu')?.classList.add(`${styles.d_initial}`);
    }

    const closeModal = () => {
        document.querySelector('#drop-menu')?.classList.remove(`${styles.d_initial}`);
        document.querySelector('#drop-menu')?.classList.add(`${styles.d_none}`);
    }

    return (
        <>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    {navOptions.map((item) => (
                        <div key={item.label}>
                            <Link to={item.path}>{item.label}</Link>
                        </div>
                    ))}
                    <div>
                        <img
                        className={styles.avatar}
                        onClick={openModal}
                            src={user.avatar}
                            alt={user.name}
                        />
                    </div>
                </nav>

                <div id="drop-menu" className={`${styles.modal} ${styles.d_none}`}>
                        <div><span onClick={closeModal}>X</span></div>
                        <div><span>Editar perfil</span></div>
                        <div><span onClick={logout}>Logout</span></div>
                </div>
            </header>
        </>
    );
}
