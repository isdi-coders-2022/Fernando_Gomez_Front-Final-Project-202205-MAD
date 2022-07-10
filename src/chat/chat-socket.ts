import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { iRoom } from '../interfaces/interfaces';
import { updateRoomAction } from '../reducers/room/action.creators';

export const socket = io('http://localhost:4000');


socket.on('response-message', (payload) => {
    console.log(payload);
    console.log('fecha: ', payload.createdAt);
    // handleNewMessage(message);
    const updatedRoom = payload
    // dispatcher(updateRoomAction(updatedRoom as iRoom));
})

export const handleNewMessage = (message: any) => {
    const messages = document.querySelector('#messages');

    messages?.appendChild(buildNewMessage(message));
}

const buildNewMessage = (message: string) => {

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(message));
    return li;
}


