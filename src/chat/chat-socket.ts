import io from 'socket.io-client';

export const socket = io('http://localhost:4000');




export const handleNewMessage = (message: any) => {
    const messages = document.querySelector('#messages');

    messages?.appendChild(buildNewMessage(message));
}

const buildNewMessage = (message: string) => {

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(message));
    return li;
}


