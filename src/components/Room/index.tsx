import { iMessage, iRoom, iStore } from "../../interfaces/interfaces";
import { RoomCard } from "../RoomCard";
import { socket} from '../../chat/chat-socket';
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRoomAction } from "../../reducers/room/action.creators";
import styles from './index.module.css';

export function Room({roomId, data}: {roomId: string , data: iMessage[]}) {
    const rooms = useSelector((store: iStore) => store.rooms);
    const user = useSelector((store: iStore) => store.users[0]);
    const users = useSelector((store: iStore) => store.users);
    
    const room = rooms.find((room) => roomId === room._id)   
    const dispatcher = useDispatch();

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
            recipient: room?.users[1]._id as string,
            content: formData,
            type: 'p2p'
        }
        let array = JSON.stringify(room?.messages);
        let newArray = JSON.parse(array);
        newArray?.push(newMessage);
      
        // let newRoom = {...room as iRoom, messages: newArray};
       
        socket.emit('message', {
            message: newMessage,
            roomId: room?._id as string,
        })

    }, [formData])

    // TODO review. A mmesage isn't sended with the same text
    
    socket.on('response-message', (payload) => {
        const updatedRoom = payload
        dispatcher(updateRoomAction(updatedRoom as iRoom));
    })

    useEffect(() => {
    }, [dispatcher, handleSubmit, rooms])

    function formatDate(date: Date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    return (
        <>
            <ul>
                {room?.messages.map(item => {
                    const sender = users.find(user => user._id === item.sender);
                    let date = (item.createdAt as string).slice(0, -9);
                    date = (date).slice(1);
                    date = (date).replace('T', ' ');

                    // const dateString = datedate2.getDate()  + "-" + (datedate2.getMonth()+1) + "-" + datedate2.getFullYear() + " " +
                    // datedate2.getHours() + ":" + datedate2.getMinutes();
                    return (
                            <li 
                                key={item.createdAt + item.content} 
                                className={
                                    user._id === sender?._id 
                                        ? `${styles.card_container} ${ styles.mine}` 
                                        : `${styles.card_container} ${ styles.not_mine}`
                                }
                            >
                                {/* {JSON.parse(item.createdAt as string)} */}
                                {date}
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
                            type="text" 
                            name="name"
                            placeholder="Escribe un mensaje.."
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Enviar</button>

                </form>
            </div>
        </>
    )
} 