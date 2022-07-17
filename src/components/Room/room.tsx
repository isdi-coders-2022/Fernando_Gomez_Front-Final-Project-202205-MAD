import { iMessage, iStore } from "../../interfaces/interfaces";
import { RoomCard } from "../RoomCard/room-card";
import { socket} from '../../chat/chat-socket';
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from './index.module.css';

export function Room({roomId, data}: {roomId: string , data: iMessage[]}) {
    // TODO review, don't need the data parameter
    const rooms = useSelector((store: iStore) => store.rooms);

    const user = useSelector((store: iStore) => store.user[0]);
    
    const room = rooms.find((room) => roomId === room._id) 
    
    const initialFormData = '';

    const [formData, setFormData] = useState(initialFormData);
    const handleChange = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormData(element.value);
    };
    
    const handleSubmit = useCallback(async (ev: SyntheticEvent) => {
        ev.preventDefault();
       
        const newMessage: iMessage = {
            _id : '',
            createdAt: JSON.stringify(new Date()),
            sender: user._id as string,
            recipient: room?.users[1] as string,
            content: formData,
            seen: false
        }
     
        let array = JSON.stringify(room?.messages);
        let newArray = JSON.parse(array);
        newArray?.push(newMessage);
      
        socket.emit('message', {
            message: newMessage,
            roomId: room?._id as string,
        })
        setFormData('');

    }, [formData])

    return (
        <>
            <ul data-testid="1">
                {room?.messages.map(item => {
                    return (
                            <li key={item.createdAt} className={styles.list}>
                                <RoomCard message={item}/>
                            </li>
                        )
                })
                }
            </ul>
            
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input 
                            id="input-box"
                            type="text" 
                            name="name"
                            placeholder="Escribe un mensaje.."
                            onChange={handleChange}
                            required
                            value={formData}
                        />
                    </div>
                    <button type="submit">Enviar</button>

                </form>
            </div>
        </>
    )
} 