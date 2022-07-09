import { iMessage } from "../../interfaces/interfaces";
import { RoomCard } from "../RoomCard";
import {handleSubmitNewMessage} from '../../chat/chat-socket';
import { SyntheticEvent, useState } from "react";
import io from 'socket.io-client';

const socket = io('http://localhost:4000');




export function RoomList({data}: {data: iMessage[]}) {
    socket.on('message', (message) => {
        handleNewMessage(message);
    })
    
    const handleNewMessage = (message: any) => {
        const messages = document.querySelector('#messages');

        console.log('message: ',message);
    
        messages?.appendChild(buildNewMessage(message));
    }
    
    const buildNewMessage = (message: string) => {

        console.log('build message: ',message)
    
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(message));
        return li;
    }

     const initialState = '';

    const [formData, setFormData] = useState(initialState);
    const handleChange = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormData(element.value);
    };

    const handleSubmit = async (ev: SyntheticEvent) => {
        ev.preventDefault();
        socket.emit('message', formData);
        // updatedRobot = await apiRobot.updateOne( (robot as iRobot)._id , updatedRobot);
        // dispatch(robotActions.updateRobotAction(updatedRobot));
        // // setFormData(initialState);
        // navigate(`/details/${updatedRobot._id}`);
    }
    return (
        <>
            <ul>
                {data.map(item => (
                    <li key={item._id}>
                        <RoomCard message={item}/>
                    </li>
                    ))
                }
            </ul>
            <div>
                <ul id="messages">
                    <li>messages:</li>

                </ul>
            </div>
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