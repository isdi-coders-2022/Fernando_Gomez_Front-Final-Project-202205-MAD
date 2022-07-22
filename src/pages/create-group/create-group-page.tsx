import { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../chat/chat-socket';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { iStore, iUser } from '../../interfaces/interfaces';
import { loadGroupUsersAction } from '../../reducers/group-room/action.creators';
import { storage } from '../../firebase';
import { CreateGroupUsersList } from '../../components/CreateGroupUsersList/create-group-users-list';
import styles from './create-group-page.module.css';
import { Button, TextField } from '@mui/material';

export default function CreateGroupPage() {
    const loggedUser = useSelector((store: iStore) => store.user[0]);

    const users = useSelector((store: iStore) => store.users);
    const groupRoom = useSelector((store: iStore) => store.groupRoom);
    const dispatcher = useDispatch();
    const initResult: iUser[] = [];
    const [search, setSearch] = useState(true);
    const [result, setResult] = useState(initResult);
    const initFormData = {
        name: '',
        image: '',
    };
    const [formData, setFormData] = useState(initFormData);

    let results: iUser[] = [];

    const changeInput = (ev: SyntheticEvent) => {
        if ((ev.target as HTMLFormElement).value !== '') {
            results = users.filter((user) =>
                user.nickname.includes((ev.target as HTMLFormElement).value)
            );
            setResult(results);
            setSearch(false);
        } else {
            setSearch(true);
        }
    };

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
        setFormData({ ...formData, image: url });
    }

    const create = async (ev: SyntheticEvent) => {
        ev.preventDefault();
        const newGroupRoom = [...groupRoom];
        newGroupRoom.unshift(loggedUser._id as string);

        const newRoom = {
            ...formData,
            owner: loggedUser._id as string,
            users: newGroupRoom,
        };
        socket.emit('new-group-room', newRoom);
        dispatcher(loadGroupUsersAction([]));
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>Selecciona los participantes</h1>
            <form id="form" className={styles.form} onSubmit={create}>
                <div className={styles.fields}>
                    <div>
                        <TextField
                            type="text"
                            name="name"
                            onChange={handleChange}
                            id="outlined-basic"
                            variant="outlined"
                            label="Nombre del grupo"
                            size="small"
                            required
                        />
                    </div>
                    <div>
                        <TextField
                            type="file"
                            name="image"
                            onChange={handleUpload}
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                        />
                    </div>
                </div>
                <div className={styles.button}>
                    <Button type="submit" variant="contained" size="small" data-testid="submit-button">
                        Crear grupo
                    </Button>
                </div>
            </form>
            <div>
                <div className={styles.search_box}>
                    <TextField
                        type="text"
                        id="searchBar"
                        onChange={changeInput}
                        label="🔍"
                        variant="outlined"
                        size="small"
                    />
                </div>
            </div>
            <div>
                {search ? (
                    <CreateGroupUsersList data={users} group={true} />
                ) : (
                    <CreateGroupUsersList data={result} group={true} />
                )}
            </div>
        </div>
    );
}
