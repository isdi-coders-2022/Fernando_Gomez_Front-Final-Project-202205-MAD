import { iMessage } from "../../interfaces/interfaces";
import { RoomCard } from "../RoomCard";
import {handleNewMessage, socket} from '../../chat/chat-socket';
import { SyntheticEvent, useState } from "react";
import io from 'socket.io-client';





export function RoomList({data}: {data: iMessage[]}) {
    const initialFormData = '';

    const [formData, setFormData] = useState(initialFormData);
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