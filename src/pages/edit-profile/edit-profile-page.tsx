import { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { iUser, iStore } from '../../interfaces/interfaces';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import { socket } from '../../chat/chat-socket';
import { Spinner } from '../../components/Layout/Spinner/spinner';
import Swal from 'sweetalert2';
import { Button, TextField } from '@mui/material';
import styles from './edit-profile-page.module.css';
import { LocalStoreService } from '../../services/local-storage';

export default function EditProfilePage() {
    const user = useSelector((store: iStore) => store.user[0]);
    const localStorage = new LocalStoreService();

    const token = localStorage.getToken();

    let initialState: iUser = user;
    initialState = { ...(user as iUser) };

    const [formData, setFormData] = useState(initialState as iUser);

    const handleChange = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        const value = element.value;
        setFormData({ ...formData, [element.name]: value });
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
        setFormData({ ...formData, avatar: url });
    }

    const handleSubmit = async (ev: SyntheticEvent) => {
        ev.preventDefault();
        const updatedUser: iUser = { ...(formData as iUser) };
        socket.emit('update-user', updatedUser);
    };

    const deleteAccount = (id: string, token: string) => {
        socket.emit('delete-account', { id, token });
    };

    const alert1 = () => {
        Swal.fire({
            title: 'Confirmación necesaria',
            text: '¿Quieres eliminar tu cuenta definitivamente?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteAccount(user._id as string, token as string);
            }
        });
    };

    return (
        <div className={styles.form_container}>
            {user ? (
                <>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div data-testid="edit-page">
                            <TextField
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
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
                                type="text"
                                name="name"
                                placeholder="Nombre"
                                value={formData.name}
                                onChange={handleChange}
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
                                placeholder="Apellidos"
                                value={formData.surname}
                                onChange={handleChange}
                                required
                                id="outlined-basic"
                                label="Apellidos"
                                variant="outlined"
                                size="small"
                            />
                        </div>
                        <div>
                            <TextField
                                type="text"
                                name="nickname"
                                placeholder="Nick name"
                                value={formData.nickname}
                                onChange={handleChange}
                                required
                                id="outlined-basic"
                                label="Nick"
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
                            <TextField
                                type="file"
                                name="avatar"
                                onChange={handleUpload}
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                data-testid="fileupload"
                            />
                        </div>

                        <div>
                            <Button
                                variant="contained"
                                size="small"
                                type="submit"
                            >
                                Guardar cambios
                            </Button>
                        </div>
                    </form>

                    <div>
                        <Button
                            variant="contained"
                            size="small"
                            color="error"
                            onClick={alert1}
                            data-testid="delete-account"
                        >
                            Eliminar mi cuenta
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <Spinner />
                </>
            )}
        </div>
    );
}
