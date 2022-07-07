import { iMessage } from "../../interfaces/interfaces";


export function RoomCard({message}: {message: iMessage}) {
    console.log(message);
    return (
        <div className="card-container">
            
            <div>{message.content}</div>
        </ div>
    )
}