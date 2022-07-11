import { SyntheticEvent, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { socket } from "../../chat/chat-socket";
import { iRoom, iStore, iUser } from "../../interfaces/interfaces";
import { LocalStoreService } from "../../services/local-storage";
import { formatDate } from "../../utils/formatDate";
import styles from './index.module.css';

export function UserCard({user}: {user: iUser}) {
    const loggedUser = useSelector((store: iStore) => store.user[0]);

    const handleClick = (ev: SyntheticEvent) => {
        ev.preventDefault();
       
        const newRoom: iRoom = {
            name: '',
            users: [user._id as string, loggedUser._id as string],
            messages: [],
            image: '',
        }
        console.log(newRoom);
      
        socket.emit('new-p2p-room', {
            room: newRoom,
        })

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