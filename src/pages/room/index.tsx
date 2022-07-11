import { useSelector } from "react-redux";
import { Room } from "../../components/Room";
import { iStore } from "../../interfaces/interfaces";

export default function RoomPage(){

    const rooms = useSelector((store: iStore) => store.rooms);
    console.log(rooms);

    return (
        <>
        <h1>Conversación</h1>
{rooms.length >0 && <Room data={rooms[0].messages} roomId={rooms[0]._id as string} />}
            {/* <Room data={rooms[0].messages} roomId={rooms[0]._id as string} /> */}
        </>
    )
}