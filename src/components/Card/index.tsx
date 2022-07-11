import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { iRoom, iStore, iUser } from "../../interfaces/interfaces";
import { LocalStoreService } from "../../services/local-storage";
import styles from './index.module.css';




export function Card({room}: {room: iRoom}) {
    const localStorage = useMemo(() => new LocalStoreService(), []);
    const user: iUser = localStorage.getUser();
    const navigate = useNavigate();
        if(!user){
            navigate('/login');
        }
    const users = useSelector((store: iStore) => store.users);
    const sender = users.find(user => user._id === room.messages[room.messages.length - 1].sender);
    const id1 = room.name?.substring(0, 24);
    const id2 = room.name?.substring(24, room.name.length);
    console.log(id1);
    console.log(id2);
    let otherId = '';
    (user._id === id1) ? otherId = id2 as string : otherId = id1 as string;
    console.log('otherId: ', otherId);

    const otherUser = users.find(user => user._id === otherId);
    // const otherUser = users.find(user => user._id === '62cad2e2c32835e32432a546');
    console.log(otherUser);
    console.log(users);

    return (
        <>
                <Link to={`room/${room._id}`} >
                    <div className={styles.card_container} >
                        <div>
                            <div>
                                {otherUser?.nickname}
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