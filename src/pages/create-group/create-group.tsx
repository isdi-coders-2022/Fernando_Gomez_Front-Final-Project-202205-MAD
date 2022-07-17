import { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../chat/chat-socket';
import { UsersList } from '../../components/UsersList/users-list';
import { iRoom, iStore, iUser } from '../../interfaces/interfaces';
import { loadGroupUsersAction } from '../../reducers/group-room/action.creators';
import styles from './index.module.css';

export default function CreateGroupPage() {
    const loggedUser = useSelector((store: iStore) => store.user[0]);

    const users = useSelector((store: iStore) => store.users);
    const groupRoom = useSelector((store: iStore) => store.groupRoom);
    const dispatcher = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (loggedUser.onConversation !== ''){
    //         socket.emit('on-conversation', {
    //             userId: loggedUser._id,
    //             token: loggedUser.token,
    //             roomId: ''
    //         })
    //     }
    // }, [])

    const initResult: iUser[] = [];
    const [search, setSearch] = useState(true);
    const [result, setResult] = useState(initResult);
    const [formData, setFormData] = useState({name: ''});

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

    const create = async (ev: SyntheticEvent) => {
        ev.preventDefault();

        
        const newGroupRoom = [...groupRoom];
        newGroupRoom.unshift(loggedUser._id as string);
        
        const newRoom = {
            name: formData.name,
            owner: loggedUser._id as string,
            users: newGroupRoom
        };
        socket.emit('new-group-room', newRoom );
        dispatcher(loadGroupUsersAction([]));
        
    };
    

    return (
        <div className={styles.container}>
            <h1>Escoge los participantes</h1>
            <form id="form" onSubmit={create}>
                <div>
                    <input onChange={handleChange} type="text" placeholder='Nombre del grupo' name="name" required />
                </div>
                <div>
                    <div>
                        <button type="submit">Aceptar y crear</button>
                    </div>
                </div>
            </form>
            <div>
                <input
                    onChange={changeInput}
                    type="text"
                    id="searchBar"
                    placeholder="🔍"
                />
            </div>
            <div>
                {search ? (
                    <UsersList data={users} group={true} />
                ) : (
                    <UsersList data={result} group={true} />
                )}
            </div>
        </div>
    );
}
