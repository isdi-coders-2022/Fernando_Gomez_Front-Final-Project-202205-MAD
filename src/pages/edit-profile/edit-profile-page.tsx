import { SyntheticEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { iUser, iStore } from "../../interfaces/interfaces";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { socket } from "../../chat/chat-socket";
import { Spinner } from "../../components/Layout/Spinner/spinner";
import { Alert, openAlert, closeAlert } from "../../components/Alert/alert";

export default function EditProfilePage(){

    const user = useSelector((store: iStore) => store.user[0]);
    const navigate = useNavigate();
    const goBack = () => navigate(-1);


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

        navigate(`/`);
    }

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

                    <Alert />

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


