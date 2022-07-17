import { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { socket } from '../../../chat/chat-socket';
import { iRouterItem, iStore, iUser } from '../../../interfaces/interfaces';
import { loadLoggedUsersAction } from '../../../reducers/logged-user/action.creators';
import { loadRoomsAction } from '../../../reducers/room/action.creators';
import { loadUsersAction } from '../../../reducers/user/action.creators';
import styles from './index.module.css';

export function Header({ navOptions }: { navOptions: iRouterItem[] }) {
    const user = useSelector((store: iStore) => store.user[0]);

    const dispatcher = useDispatch();

    const navigate = useNavigate();

    const logout = async (ev: SyntheticEvent) => {
        ev.preventDefault();
        localStorage.removeItem('User');
        localStorage.removeItem('Token');

        dispatcher(loadLoggedUsersAction([]));
        dispatcher(loadUsersAction([]));
        dispatcher(loadRoomsAction([]));

        const newUser: iUser = {
            ...user,
            online: false,
        };

        socket.emit('update-user', newUser);

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
    navOptions = navOptions.filter((item) =>
        item.path !== '/edit-profile' ? item : ''
    );
    navOptions = navOptions.filter((item) => (item.path !== '*' ? item : ''));

    const openModal = () => {
        document
            .querySelector('#drop-menu')
            ?.classList.remove(`${styles.d_none}`);
        document
            .querySelector('#drop-menu')
            ?.classList.add(`${styles.d_initial}`);
    };

    const closeModal = () => {
        document
            .querySelector('#drop-menu')
            ?.classList.remove(`${styles.d_initial}`);
        document.querySelector('#drop-menu')?.classList.add(`${styles.d_none}`);
    };

    const navAndClose = () => {
        closeModal();
        if (user.onConversation !== '') {
            socket.emit('on-conversation', {
                userId: user._id,
                token: user.token,
                roomId: '',
            });
        }
        navigate('/edit-profile');
    };

    const navAndEmit = (path: string) => {
        if (user.onConversation !== '') {
            socket.emit('on-conversation', {
                userId: user._id,
                token: user.token,
                roomId: '',
            });
        }
        navigate(`${path}`);
    };

    return (
        <>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    {navOptions.map((item) => (
                        <div
                            onClick={() => {
                                navAndEmit(item.path);
                            }}
                            key={item.label}
                        >
                            {/* <div  key={item.label}> */}
                            {/* <Link to={item.path}>{item.label}</Link> */}
                            <span>{item.label}</span>
                        </div>
                    ))}
                    <div>
                        <img
                            className={styles.avatar}
                            onClick={openModal}
                            src={user.avatar}
                            alt={user.nickname}
                        />
                    </div>
                </nav>

                <div
                    id="drop-menu"
                    className={`${styles.modal} ${styles.d_none}`}
                >
                    <div onClick={closeModal}>
                        <span>X</span>
                    </div>
                    <div onClick={navAndClose}>
                        {/* <Link to={`/edit-profile`} > */}
                        <span>Editar perfil</span>
                        {/* </Link> */}
                    </div>
                    <div onClick={logout}>
                        <span>Logout</span>
                    </div>
                </div>
            </header>
        </>
    );
}
