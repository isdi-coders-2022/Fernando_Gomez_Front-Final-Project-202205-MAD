import { useSelector } from "react-redux";
import { Room } from "../../components/Room";
import { iStore } from "../../interfaces/interfaces";

export default function RoomPage(){

    const user = useSelector((store: iStore) => store.users);
    const rooms = useSelector((store: iStore) => store.rooms);

    return (
        <>
        <h1>Conversación</h1>

            <Room data={rooms[0].messages} roomId={rooms[0]._id as string} />
        </>
    )
}