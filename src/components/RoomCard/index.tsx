import { iMessage } from "../../interfaces/interfaces";


export function RoomCard({message}: {message: iMessage}) {
    return (
        <div className="card-container">
            <div>{message.content}</div>
            <div>{message.sender}</div>
        </ div>
    )
}