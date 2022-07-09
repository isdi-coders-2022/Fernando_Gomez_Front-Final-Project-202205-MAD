import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const messages = document.querySelector('#messages');
const message: any  = document.querySelector('#message');

export const handleSubmitNewMessage = () => {
//    console.log('hi');
    if(message){

    // console.log(message.value);

        socket.emit('message', {data: message.value})
    }
}

socket.on('message', ({data}) => {
    // alert('dfdf');
    // console.log(data);
    handleNewMessage(data);
})

const handleNewMessage = (message: any) => {
    messages?.appendChild(buildNewMessage(message));
}

const buildNewMessage = (message: string) => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(message));
    return li;
}