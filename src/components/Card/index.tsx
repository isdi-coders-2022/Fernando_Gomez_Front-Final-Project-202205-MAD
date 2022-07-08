import { Link } from "react-router-dom";
import { iRoom } from "../../interfaces/interfaces";


export function Card({room}: {room: iRoom}) {
    return (
        <>
            <h2>Conversación</h2>

            <div className="card-container">
                <div>
                <Link to={`room/${room._id}`} >
                    <span>{room.messages[room.messages.length - 1].content}</span>
                </Link>
                </div>
                <div>{room.name}</div>
            </ div>
        </>
    )
}