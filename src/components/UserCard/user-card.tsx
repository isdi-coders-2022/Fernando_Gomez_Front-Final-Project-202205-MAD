import { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { socket } from "../../chat/chat-socket";
import { iRoom, iStore, iUser } from "../../interfaces/interfaces";
import { addRoomAction } from "../../reducers/room/action.creators";
import { sortIds } from "../../utils/sortIds";
import styles from './index.module.css';

export function UserCard({user}: {user: iUser}) {
    // TODO verify if there exists teh room yet
    const loggedUser = useSelector((store: iStore) => store.user[0]);
    const rooms = useSelector((store: iStore) => store.rooms);
    const dispatcher = useDispatch();
    const navigate = useNavigate();

    const handleClick = (ev: SyntheticEvent) => {
        ev.preventDefault();
        const ids = sortIds([user._id as string, loggedUser._id as string]);
        const roomName: string = ids[0] + ids[1];
        const exists = rooms.find(room => room.name as string === roomName as string);

        if (!!exists){
            navigate(`/room/${exists._id}`);
        }else{
            const newRoom: iRoom = {
                name: '',
                users: [user._id as string, loggedUser._id as string],
                messages: [],
                image: '',
            }
            socket.emit('new-p2p-room', newRoom );
            socket.on('new-p2p-room', (payload: iRoom) => {
                dispatcher(addRoomAction(payload as iRoom));
                navigate(`/room/${payload._id}`);
            })
            
        }
    }

    

    

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
