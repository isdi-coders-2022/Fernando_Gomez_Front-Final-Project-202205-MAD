import { SyntheticEvent, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { socket } from "../../chat/chat-socket";
import { iRoom, iStore, iUser } from "../../interfaces/interfaces";
import { addRoomAction } from "../../reducers/room/action.creators";
import { LocalStoreService } from "../../services/local-storage";
import { formatDate } from "../../utils/formatDate";
import { sortIds } from "../../utils/sortIds";
import styles from './index.module.css';

export function UserCard({user}: {user: iUser}) {
    // TODO verify if there exists teh room yet
    const loggedUser = useSelector((store: iStore) => store.user[0]);
    console.log('user: ', user._id);
    console.log('logged user: ', loggedUser._id);
    const rooms = useSelector((store: iStore) => store.rooms);
    const dispatcher = useDispatch();
    const navigate = useNavigate();

    const handleClick = (ev: SyntheticEvent) => {
        ev.preventDefault();
        const ids = sortIds([user._id as string, loggedUser._id as string]);
        const roomName: string = ids[0] + ids[1];
        const exists = rooms.find(room => room.name as string === roomName as string);
        console.log('exists: ', exists);

        if (!!exists){
            navigate(`/room/${exists._id}`);
        }else{
            const newRoom: iRoom = {
                name: '',
                users: [user._id as string, loggedUser._id as string],
                messages: [],
                image: '',
            }
            socket.emit('new-p2p-room', {
                room: newRoom,
            })
        }
    }

    socket.on('new-p2p-room', (payload) => {
        const newRoom = payload
        dispatcher(addRoomAction(newRoom as iRoom));
    })

    return (
        <>
            {/* <Link to={``} > */}
                    <div className={styles.card_container} onClick={handleClick}>
                        <p>
                            {user.nickname}
                        </p>
                    </ div>
            {/* </Link> */}
                
        </>
    )
}
