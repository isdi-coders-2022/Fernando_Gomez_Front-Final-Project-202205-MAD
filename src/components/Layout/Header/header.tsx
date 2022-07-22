import { Button } from '@mui/material';
import { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
            .querySelector('#back-modal')
            ?.classList.remove(`${styles.d_none}`);
        document
            .querySelector('#back-modal')
            ?.classList.add(`${styles.d_initial}`);
    };

    const closeModal = () => {
        document
            .querySelector('#back-modal')
            ?.classList.remove(`${styles.d_initial}`);
        document
            .querySelector('#back-modal')
            ?.classList.add(`${styles.d_none}`);
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
                        <div key={item.label}>
                            <Button
                                onClick={() => {
                                    navAndEmit(item.path);
                                }}
                                variant="outlined"
                                className={styles.link2}
                            >
                                {item.label}
                            </Button>
                        </div>
                    ))}
                    <div>
                        <img
                            className={styles.avatar}
                            onClick={openModal}
                            src={user.avatar}
                            alt={user.nickname}
                            id="open-modal"
                            role="button"
                        />
                    </div>
                </nav>

                <div
                    id="back-modal"
                    className={`${styles.back_modal} ${styles.d_none}`}
                    onClick={closeModal}
                >
                    <div id="drop-menu" className={`${styles.modal}`}>
                        <div onClick={closeModal}>
                            <span>
                                <img
                                    className={`${styles.link} ${styles.cancel}`}
                                    src="./assets/cancel.png"
                                    alt="close window"
                                />
                            </span>
                        </div>
                        <div onClick={navAndClose} className={`${styles.link}`}>
                            <span>
                                <span>Editar perfil</span>{' '}
                                <img src="./assets/settings.png" alt="logout" />
                            </span>
                        </div>
                        <div
                            onClick={logout}
                            className={`${styles.link}`}
                            id="logout-button"
                            role="button"
                        >
                            <span>
                                <span>Logout</span>{' '}
                                <img src="./assets/shutdown.png" alt="logout" />{' '}
                            </span>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
