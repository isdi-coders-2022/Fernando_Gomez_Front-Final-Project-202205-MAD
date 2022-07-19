import { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { socket } from "../../chat/chat-socket";
import { iRoom, iStore, iUser } from "../../interfaces/interfaces";
import { addRoomAction } from "../../reducers/room/action.creators";
import { sortIds } from "../../utils/sortIds";
import { Avatar } from "../Avatar/avatar";
import styles from './index.module.css';

export function UserCard({user}: {user: iUser}) {
    // TODO verify if there exists teh room yet
    const loggedUser = useSelector((store: iStore) => store.user[0]);
    
    const rooms = useSelector((store: iStore) => store.rooms);
    const navigate = useNavigate();

    const handleClick = (ev: SyntheticEvent) => {
        ev.preventDefault();
        const ids = sortIds([user._id as string, loggedUser._id as string]);
        const roomName: string = ids[0] + ids[1];
        const exists = rooms.find(room => room.name as string === roomName as string);

        if (!!exists){
            socket.emit('on-conversation', {
                userId: user._id,
                token: user.token,
                roomId: exists._id
            })
            navigate(`/room/${exists._id}`);
        }else{
            const newRoom: iRoom = {
                owner: loggedUser._id as string,
                users: [user._id as string, loggedUser._id as string],
                messages: [],
                image: '',
            }
            socket.emit('new-p2p-room', newRoom );
        }
    }
    
    socket.on('new-p2p-room', (payload: iRoom) => {
            if(payload.owner === loggedUser._id){
                socket.emit('on-conversation', {
                    userId: user._id,
                    token: user.token,
                    roomId: payload._id
                })
                navigate(`/room/${payload._id}`);
            }
    })

    return (
        <>
                    <div className={styles.card_container} onClick={handleClick}>
                        
                            <span>
                                <Avatar src={user.avatar as string} alt={user.nickname} />
                            </span>
                            <span>{user.nickname}</span>
                        
                    </ div>
                
        </>
    )
}
