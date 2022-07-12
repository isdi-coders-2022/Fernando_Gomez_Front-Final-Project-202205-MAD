import { SyntheticEvent, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadLoggedUsersAction } from '../../reducers/logged-user/action.creators';
import { loadRoomsAction } from '../../reducers/room/action.creators';
import { loadUsersAction } from '../../reducers/user/action.creators';
import { ApiChat } from '../../services/api';
import { LocalStoreService } from '../../services/local-storage';
import styles from './index.module.css';

export default function LoginPage() {
    const localStorage = new LocalStoreService();

    const dispatcher = useDispatch();
    const apiChat = useMemo(() => new ApiChat(), []);

    const navigate = useNavigate();
    const initialState = { email: '', password: '' };
    const [formData, setFormData] = useState(initialState);

    const handleChange = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        const value = element.value;
        setFormData({ ...formData, [element.name]: value });
    };

    const handleSubmit = async (ev: SyntheticEvent) => {
        ev.preventDefault();
        const resp = await apiChat.login(formData);
        const rooms = await apiChat.getAllRoomsByUser(
            resp.user._id,
            resp.token
        );
        const users = await apiChat.getAllUsers(resp.user._id, resp.token);

        let user = resp.user;
        user = { ...user, token: resp.token };

        dispatcher(loadLoggedUsersAction([user]));
        dispatcher(loadUsersAction(users));
        dispatcher(loadRoomsAction(rooms));

        localStorage.setUser(user);

        navigate(`/`);
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <div><label htmlFor="">Email</label></div>
                    <div><input type="email" name="email" onChange={handleChange} /></div>
                </div>
                <div>
                    <div><label htmlFor="">Password</label></div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <div><button type="submit">Login</button></div>
                </div>
            </form>
        </div>
    );
}
