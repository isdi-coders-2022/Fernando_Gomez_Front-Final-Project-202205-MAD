import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { iRoom, iStore } from "../../interfaces/interfaces";
import styles from './index.module.css';




export function Card({room}: {room: iRoom}) {
    const users = useSelector((store: iStore) => store.users);
    const sender = users.find(user => user._id === room.messages[room.messages.length - 1].sender);

    return (
        <>
                <Link to={`room/${room._id}`} >
                    <div className={styles.card_container} >
                        <div>
                            <div>
                                {sender?.nickname}
                            </div>
                            <div>
                                {room.messages.length > 0 
                                    ? <span>{room.messages[room.messages.length - 1].content}</span>
                                    : <pre>Envía tu primer mensaje..</pre>
                                }
                            </div>
                        </div>
                    </ div>
                </Link>
                
        </>
    )
}