import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Room } from "../../components/Room";
import { iMessage, iStore } from "../../interfaces/interfaces";

export default function RoomPage(){
    const { id } = useParams();

    const rooms = useSelector((store: iStore) => store.rooms);
    const room = rooms.find(room => room._id === id);

    return (
        <>
        <h1>Conversación</h1>
            {rooms.length >0 && <Room data={room?.messages as iMessage[]} roomId={room?._id as string} />}
            {/* <Room data={rooms[0].messages} roomId={rooms[0]._id as string} /> */}
        </>
    )
}