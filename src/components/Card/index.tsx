import { Link } from "react-router-dom";
import { iRoom } from "../../interfaces/interfaces";
import styles from './index.module.css'


export function Card({room}: {room: iRoom}) {
    return (
        <>
                <Link to={`room/${room._id}`} >
                    <div className={styles.card_container}>
                        <div>
                            <div>
                                {room.messages[room.messages.length - 1].sender}
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