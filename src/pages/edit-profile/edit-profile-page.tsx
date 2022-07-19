import { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { iUser, iStore } from "../../interfaces/interfaces";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { socket } from "../../chat/chat-socket";
import { Spinner } from "../../components/Layout/Spinner/spinner";
import { Alert, openAlert, closeAlert } from "../../components/Alert/alert";
import { deleteUserAction, loadUsersAction, updateUserAction } from "../../reducers/user/action.creators";
import { LocalStoreService } from "../../services/local-storage";
import { loadLoggedUsersAction } from "../../reducers/logged-user/action.creators";
import { loadRoomsAction } from "../../reducers/room/action.creators";

export default function EditProfilePage(){

    const user = useSelector((store: iStore) => store.user[0]);
    // const localStorage = new LocalStoreService();

    const token = localStorage.getItem('Token')
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const dispatcher = useDispatch();



    let initialState: iUser = user;
    initialState = {...user as iUser};

    const [formData, setFormData] = useState(initialState as iUser);

    const handleChange = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        const value = element.value;
        setFormData({...formData, [element.name]: value});
    };

    async function handleUpload(ev: SyntheticEvent) {
        const element = ev.target as HTMLInputElement;
        const file = (element.files as FileList)[0];
        const avatarRef = ref(storage, `/files/${file.name}`);
        await uploadBytes(
            avatarRef,
            file as unknown as Blob | Uint8Array | ArrayBuffer
        );
        // TODO needs twice to load the correct image
        const url = await getDownloadURL(ref(storage, `/files/${file.name}`));
        setFormData({ ...formData, avatar: url })
    }

    const handleSubmit = async (ev: SyntheticEvent) => {
        ev.preventDefault();
        const updatedUser: iUser = {...formData as iUser};

        socket.emit('update-user', 
            updatedUser
        );

    }

    socket.on('delete-account', (payload) => {
        console.log('llega respuesta')
        console.log(payload)

        localStorage.removeItem('User')
        localStorage.removeItem('Token')

        dispatcher(updateUserAction(payload));

        // const newUser: iUser = {
        //     ...user,
        //     online: false,
        // };

        // TODO notify other users from the back
        // socket.emit('update-user', newUser);
        console.log('cuenta eliminada')
        navigate(`/`);

    })

    return (
        <div >
            {user ? (
                <>
                    <form onSubmit={handleSubmit}>
                    <div><label htmlFor="">Email</label></div>
                        <div>
                            <input 
                                type="email" 
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div><label htmlFor="">Nombre</label></div>
                        <div>
                            <input 
                                type="text" 
                                name="name"
                                placeholder="Nombre"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div><label htmlFor="">Apellidos</label></div>
                        <div>
                            <input 
                                type="text" 
                                name="surname"
                                placeholder="Apellidos"
                                value={formData.surname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div><label htmlFor="">Nick name</label></div>
                        <div>
                            <input 
                                type="text" 
                                name="nickname"
                                placeholder="Nick name"
                                value={formData.nickname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                        <div><label htmlFor="">Avatar</label></div>
                        <div>
                            <input
                                type="file"
                                name="avatar"
                                onChange={handleUpload}
                            />
                        </div>
                    </div>
                        

                        <button type="submit">Guardar cambios</button>

                    </form>

                    <button onClick={openAlert}>Eliminar mi cuenta</button>

                    <Alert id={user._id as string} token={token as string} />

                </>
            ) : (
                <>
                    <Spinner />
                </>
            )
            }
        </div>
    )
}


