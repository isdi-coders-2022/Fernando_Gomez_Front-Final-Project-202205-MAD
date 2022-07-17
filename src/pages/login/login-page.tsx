import { SyntheticEvent, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../components/Layout/Spinner';
import { loadLoggedUsersAction } from '../../reducers/logged-user/action.creators';
import { loadRoomsAction } from '../../reducers/room/action.creators';
import { loadUsersAction } from '../../reducers/user/action.creators';
import { ApiChat } from '../../services/api';
import { LocalStoreService } from '../../services/local-storage';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import styles from './index.module.css';
import { iUser } from '../../interfaces/interfaces';
import { socket } from '../../chat/chat-socket';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);

    const localStorage = new LocalStoreService();

    const dispatcher = useDispatch();
    const apiChat = useMemo(() => new ApiChat(), []);

    const navigate = useNavigate();
    const initialState = { email: '', password: '' };
    const initSignUp = { name: '', nickname: '',  email: '', avatar: '', password: '' };
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

        socket.emit('login-logout', {
            newUser: {...user, online: true},
        });

        navigate(`/`);
    };

    function handleUpload(ev: SyntheticEvent) {
        const element = ev.target as HTMLInputElement;
        const file = (element.files as FileList)[0];
        const avatarRef = ref(storage, `/files/${file.name}`);
        uploadBytes(
            avatarRef,
            file as unknown as Blob | Uint8Array | ArrayBuffer
        );
        getDownloadURL(ref(storage, `/files/${file.name}`)).then(
            (url) => (setSignUp({ ...signUp, avatar: url }))
        );
    }

    const handleSubmitSignUp = async (ev: SyntheticEvent) => {
        ev.preventDefault();
        const resp = await apiChat.signup(signUp);

        if(resp.status === 201){
            closeModal();
        } else{
            // TODO improve this
            alert('Se ha producido un error')
        }
    };

    const openModal = () => {
        document.querySelector('#loginform')?.classList.add(`${styles.d_none}`);
        document.querySelector('#signupform')?.classList.remove(`${styles.d_none}`);
    }

    const closeModal = () => {
        document.querySelector('#loginform')?.classList.remove(`${styles.d_none}`);
        document.querySelector('#signupform')?.classList.add(`${styles.d_none}`);
    }

    return (
        <>
            {loading ? (
                <Spinner  />
            ) : (
                <div  className={styles.container}>
                <div className={styles.logo_section}>
                    <img src="./logo.png" alt="" />
                </div>
                <div>
                <form id='loginform' onSubmit={handleSubmit} className={styles.form}>
                    <div>
                        <div><label htmlFor="">Email</label></div>
                        <div><input type="email" name="email" onChange={handleChange} required /></div>
                    </div>
                    <div>
                        <div><label htmlFor="">Password</label></div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div><button type="submit">Login</button></div>
                    </div>
                    <div>
                        <div><p>¿No tienes cuenta?</p></div>
                        <div>
                            <button onClick={openModal} >Regístrate</button>
                        </div>
                    </div>
                </form>
                </div>
    
    
                <div>
                <form id='signupform' onSubmit={handleSubmitSignUp} className={ `${styles.modal} ${styles.d_none} ${styles.form}`}>
                    <div>
                        <div><label htmlFor="">Nombre</label></div>
                        <div><input type="text" name="name" onChange={handleChangeSignUp} required /></div>
                    </div>
                    <div>
                        <div><label htmlFor="">Apellido</label></div>
                        <div><input type="text" name="surname" onChange={handleChangeSignUp} required /></div>
                    </div>
                    <div>
                        <div><label htmlFor="">Nick name</label></div>
                        <div><input type="text" name="nickname" onChange={handleChangeSignUp} required /></div>
                    </div>
                    <div>
                        <div><label htmlFor="">Email</label></div>
                        <div><input type="email" name="email" onChange={handleChangeSignUp} required /></div>
                    </div>
                    <div>
                        <div><label htmlFor="">Password</label></div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChangeSignUp}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div><label htmlFor="">Avatar</label></div>
                        <div>
                            <input
                                type="file"
                                name="avatar"
                                onChange={handleUpload}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div><button type="submit">Registrarme</button></div>
                    </div>
                    <div>
                        <div><p>¿Ya tienes cuenta?</p></div>
                        <div>
                            <button onClick={closeModal} >Login</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
            )

            }
        </>
        

        
    );
}
