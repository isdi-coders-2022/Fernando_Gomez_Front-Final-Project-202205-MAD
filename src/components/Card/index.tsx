import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { iRoom, iStore, iUser } from "../../interfaces/interfaces";
import { LocalStoreService } from "../../services/local-storage";
import { formatDate } from "../../utils/formatDate";
import styles from './index.module.css';

export function Card({room}: {room: iRoom}) {
    const user = useSelector((store: iStore) => store.user[0]);
   
    const users = useSelector((store: iStore) => store.users);
    const id1 = room.name?.substring(0, 24);
    const id2 = room.name?.substring(24, room.name.length);
  
    let otherId = '';
    (user._id === id1) ? otherId = id2 as string : otherId = id1 as string;

    const otherUser = users.find(user => user._id === otherId);

    return (
        <>
            {room.messages.length > 0 &&
                <Link to={`room/${room._id}`} >
                <div className={styles.card_container} >
                    <div>
                        <div>
                            <span>
                                {otherUser?.nickname}
                            </span>
                        </div>
                        <div>
                            <p className={styles.date}>
                                {formatDate(room.messages[room.messages.length - 1].createdAt as string)}
                            </p>
                            <p className={styles.message}>
                            {room.messages.length > 0 
                                ? `${room.messages[room.messages.length - 1].content}`
                                : `Envía tu primer mensaje..`
                            }
                            </p>
                        </div>
                     
                    </div>
                </ div>
            </Link>
            }
                
        </>
    )
}