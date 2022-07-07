import { iMessage } from "../../interfaces/interfaces";
import { RoomCard } from "../RoomCard";


export function RoomList({data}: {data: iMessage[]}) {
    return (
        <ul>
            {data.map(item => (
                <li key={item._id}>
                    <RoomCard message={item}/>
                </li>
                ))
            }
        </ul>
    )
}