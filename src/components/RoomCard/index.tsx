import { iMessage } from "../../interfaces/interfaces";


export function RoomCard({message}: {message: iMessage}) {
    // console.log('fecha parsed: ', JSON.parse(message.createdAt as string));
    return (
        <div className="card-container">
            <div>{message.content}</div>
        </ div>
    )
}