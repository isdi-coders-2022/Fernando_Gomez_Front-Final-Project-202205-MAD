import { iMessage } from "../../interfaces/interfaces";
import { RoomCard } from "../RoomCard";
import {handleSubmitNewMessage} from '../../chat/chat-socket';
// import io from 'socket.io-client';



export function RoomList({data}: {data: iMessage[]}) {

// const socket = io('http://localhost:4000');

// const messages = document.querySelector('#messages');
// const message: any  = document.querySelector('#message');

//  const handleSubmitNewMessage = () => {
   
//     if(message){

//     // console.log(message.value);

//         socket.emit('message', {data: message.value})
//     }
// }

// socket.on('message', ({data}) => {
//     // alert('dfdf');
//     // console.log(data);
//     handleNewMessage(data);
// })

// const handleNewMessage = (message: any) => {
//     messages?.appendChild(buildNewMessage(message));
// }

// const buildNewMessage = (message: string) => {
//     const li = document.createElement('li');
//     li.appendChild(document.createTextNode(message));
//     return li;
// }
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
                <ul id="messages"></ul>
            </div>
            <div>
                <input type="text" id="message" />
                <button onClick={handleSubmitNewMessage} >Enviar</button>
            </div>
        </>
    )
} 