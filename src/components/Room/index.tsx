import { iMessage, iRoom, iStore } from "../../interfaces/interfaces";
import { RoomCard } from "../RoomCard";
import { socket} from '../../chat/chat-socket';
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadRoomsAction, updateRoomAction } from "../../reducers/room/action.creators";

export function Room({roomId, data}: {roomId: string , data: iMessage[]}) {
    const rooms = useSelector((store: iStore) => store.rooms);
    const user = useSelector((store: iStore) => store.users[0]);
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
        // socket.emit('message', formData);
       
        const newMessage: iMessage = {
            _id : '',
            createdAt: JSON.stringify(new Date()),
            sender: user._id as string,
            recipient: room?.users[1]._id as string,
            content: formData,
            type: 'p2p'
        }
        // const newRoom: iRoom = {...room} as iRoom;
        let array = JSON.stringify(room?.messages);
        let newArray = JSON.parse(array);
        newArray?.push(newMessage);
      
        let newRoom = {...room as iRoom, messages: newArray};
       
        socket.emit('message', {
            // user: user,
            // room: sendRoom,
            message: newMessage,
            roomId: room?._id as string,
        })

    }, [formData])

    // TODO review. A mmesage isn't sended with the same text
    // socket.on('response-message', (payload) => {
    //     const updatedRoom: iRoom = payload;
    //     // console.log(payload);
    //     // console.log('fecha: ', payload.createdAt);
    //     // handleNewMessage(message);
    //     dispatcher(updateRoomAction(updatedRoom as iRoom));
    // })
    socket.on('response-message', (payload) => {
        alert('message')
        // console.log(payload);
        console.log('fecha: ', payload.createdAt);
        // handleNewMessage(message);
        const updatedRoom = payload
        dispatcher(updateRoomAction(updatedRoom as iRoom));
    })

    useEffect(() => {
        // dispatcher(loadRoomsAction(rooms));
    }, [dispatcher, handleSubmit, rooms])



    return (
        <>
            <ul>
                {room?.messages.map(item => (
                    <li key={item.content + item.sender}>
                        {item.createdAt}
                        <RoomCard message={item}/>
                    </li>
                    ))
                }
            </ul>
            {/* <div>
                <ul id="messages">
                    <li>messages:</li>

                </ul>
            </div> */}
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
                {/* <input type="text" id="message" />
                <button onClick={handleSubmitNewMessage} >enviar js</button> */}
            </div>
        </>
    )
} 