import { iMessage } from "../../interfaces/interfaces";


export function RoomCard({message}: {message: iMessage}) {
    return (
        <div >
            <div>{message.content}</div>
        </ div>
    )
}