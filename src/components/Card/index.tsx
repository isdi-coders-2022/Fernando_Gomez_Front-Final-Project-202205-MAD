import { Link } from "react-router-dom";
import { iRoom } from "../../interfaces/interfaces";


export function Card({room}: {room: iRoom}) {
    return (
        <>
                <Link to={`room/${room._id}`} >
                    <div className="card-container">
                        <div>
                            {room.messages.length > 0 
                                ? <span>{room.messages[room.messages.length - 1].content}</span>
                                : <pre>Envía tu primer mensaje..</pre>
                            }
                            {/* <span>{room.messages[room.messages.length - 1].content}</span> */}
                        </div>
                    </ div>
                </Link>
                
        </>
    )
}