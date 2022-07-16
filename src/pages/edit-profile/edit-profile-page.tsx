import { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { iUser, iStore } from "../../interfaces/interfaces";
import { updateLoggedUserAction } from "../../reducers/logged-user/action.creators";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { ApiChat } from "../../services/api";
import { LocalStoreService } from "../../services/local-storage";



export default function EditProfilePage(){

    const user = useSelector((store: iStore) => store.user[0]);
    const localStorage = new LocalStoreService();
    const token = localStorage.getToken();

    const dispatcher = useDispatch();
    const apiChat = new ApiChat();
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

    function handleUpload(ev: SyntheticEvent) {
        const element = ev.target as HTMLInputElement;
        const file = (element.files as FileList)[0];
        const avatarRef = ref(storage, `/files/${file.name}`);
        uploadBytes(
            avatarRef,
            file as unknown as Blob | Uint8Array | ArrayBuffer
        );
        getDownloadURL(ref(storage, `/files/${file.name}`)).then(
            (url) => (setFormData({ ...formData, avatar: url }))
        );
    }

    const handleSubmit = async (ev: SyntheticEvent) => {
        ev.preventDefault();
        let updatedUser: iUser = {...formData as iUser};

        updatedUser = await apiChat.updateUser( (user as iUser)._id , token as string, updatedUser);
        dispatcher(updateLoggedUserAction(updatedUser));
        // setFormData(initialState);
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
                </>
            ) : (
                <>
                    <h1>Se ha producido un error..</h1>
                    <button onClick={goBack}>Volver</button>
                </>
            )
            }
        </div>
    )
}


