import { SyntheticEvent, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../components/Layout/Spinner/spinner';
import { loadLoggedUsersAction } from '../../reducers/logged-user/action.creators';
import { loadRoomsAction } from '../../reducers/room/action.creators';
import { loadUsersAction } from '../../reducers/user/action.creators';
import { ApiChat } from '../../services/api';
import { LocalStoreService } from '../../services/local-storage';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import styles from './index.module.css';
import { iUser } from '../../interfaces/interfaces';
import { socket } from '../../chat/chat-socket';
import Swal from 'sweetalert2';

import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);

    const localStorage = new LocalStoreService();

    const dispatcher = useDispatch();
    const apiChat = useMemo(() => new ApiChat(), []);

    const navigate = useNavigate();

    const initialState = { email: '', password: '' };
    const initSignUp = {
        name: '',
        surname: '',
        nickname: '',
        email: '',
        avatar: '',
        password: '',
    };
    const [formData, setFormData] = useState(initialState);
    const [signUp, setSignUp] = useState(initSignUp);

    const handleChange = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        const value = element.value;
        setFormData({ ...formData, [element.name]: value });
    };

    const handleChangeSignUp = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        const value = element.value;
        setSignUp({ ...signUp, [element.name]: value });
    };

    const handleSubmit = async (ev: SyntheticEvent) => {
        ev.preventDefault();
        setLoading(true);

        const resp = await apiChat.login(formData);

        if (resp.statusCode !== 401) {
            const rooms = await apiChat.getAllRoomsByUser(
                resp.user._id,
                resp.token
            );
            const users = await apiChat.getAllUsers(resp.user._id, resp.token);
            setLoading(false);

            let user = resp.user;
            user = { ...user, token: resp.token };

            dispatcher(loadLoggedUsersAction([user]));
            dispatcher(loadUsersAction(users));
            dispatcher(loadRoomsAction(rooms));

            localStorage.setUser(user._id);
            localStorage.setToken(user.token);
            const newUser: iUser = {
                ...user,
                online: true,
                token: user.token,
            };

            socket.emit('update-user', newUser);

            navigate(`/`);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'Usuario o contraseña incorrectos',
            });
            setLoading(false);
            navigate('/');
        }
    };

    async function handleUpload(ev: SyntheticEvent) {
        const element = ev.target as HTMLInputElement;
        const file = (element.files as FileList)[0];
        const avatarRef = ref(storage, `/files/${file.name}`);
        await uploadBytes(
            avatarRef,
            file as unknown as Blob | Uint8Array | ArrayBuffer
        );
        const url = await getDownloadURL(ref(storage, `/files/${file.name}`));
        setSignUp({ ...signUp, avatar: url });
    }

    const handleSubmitSignUp = async (ev: SyntheticEvent) => {
        ev.preventDefault();
        const resp = await apiChat.signup(signUp);

        if (resp.status === 201) {
            closeModal();
            Swal.fire({
                icon: 'success',
                title: 'Tu cuenta ha sido creada con éxito',
                text: 'Ya puedes acceder al chat!',
            });
            navigate(`/`);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'Se ha producido un error, vuelve a intentarlo',
            });
        }
    };

    const openModal = () => {
        document.querySelector('#loginform')?.classList.add(`${styles.d_none}`);
        document
            .querySelector('#signupform')
            ?.classList.remove(`${styles.d_none}`);
    };

    const closeModal = () => {
        document
            .querySelector('#loginform')
            ?.classList.remove(`${styles.d_none}`);
        document
            .querySelector('#signupform')
            ?.classList.add(`${styles.d_none}`);
    };

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className={styles.container} data-testid="login">
                    <div className={styles.logo_section}>
                        <img src="./assets/logo.png" alt="" />
                    </div>
                    <div>
                        <form
                            id="loginform"
                            onSubmit={handleSubmit}
                            className={styles.form}
                        >
                            <div>
                                <TextField
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    required
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    size="small"
                                />
                            </div>
                            <div>
                                <TextField
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    required
                                    id="outlined-basic"
                                    label="Contraseña"
                                    variant="outlined"
                                    size="small"
                                />
                            </div>
                            <div>
                                <div>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        data-testid="login-button"
                                    >
                                        Login
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p>¿No tienes cuenta?</p>
                                </div>
                                <div>
                                    <Button
                                        onClick={openModal}
                                        variant="outlined"
                                    >
                                        Regístrate
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div>
                        <form
                            id="signupform"
                            onSubmit={handleSubmitSignUp}
                            className={`${styles.modal} ${styles.d_none} ${styles.form}`}
                        >
                            <div>
                                <TextField
                                    type="text"
                                    name="name"
                                    onChange={handleChangeSignUp}
                                    required
                                    id="outlined-basic"
                                    label="Nombre"
                                    variant="outlined"
                                    size="small"
                                />
                            </div>
                            <div>
                                <TextField
                                    type="text"
                                    name="surname"
                                    onChange={handleChangeSignUp}
                                    required
                                    id="outlined-basic"
                                    label="Apellido"
                                    variant="outlined"
                                    size="small"
                                />
                            </div>
                            <div>
                                <TextField
                                    type="text"
                                    name="nickname"
                                    onChange={handleChangeSignUp}
                                    required
                                    id="outlined-basic"
                                    label="Nick"
                                    variant="outlined"
                                    size="small"
                                />
                            </div>
                            <div>
                                <TextField
                                    type="email"
                                    name="email"
                                    onChange={handleChangeSignUp}
                                    required
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    size="small"
                                />
                            </div>
                            <div>
                                <TextField
                                    type="password"
                                    name="password"
                                    onChange={handleChangeSignUp}
                                    required
                                    id="outlined-basic"
                                    label="Contraseña"
                                    variant="outlined"
                                    size="small"
                                />
                            </div>
                            <div>
                                <TextField
                                    data-testid="fileupload"
                                    type="file"
                                    name="avatar"
                                    onChange={handleUpload}
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                />
                            </div>
                            <div>
                                <div>
                                    <Button type="submit" variant="contained">
                                        Registrarme
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p>¿Ya tienes cuenta?</p>
                                </div>
                                <div>
                                    <Button
                                        onClick={closeModal}
                                        variant="outlined"
                                        data-testid="signup-button"
                                    >
                                        Login
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
