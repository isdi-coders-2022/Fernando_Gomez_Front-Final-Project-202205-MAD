import { useSelector } from "react-redux";
import { RoomList } from "../../components/RoomList";
import { iStore } from "../../interfaces/interfaces";

export default function RoomPage(){

    const user = useSelector((store: iStore) => store.users);
    const rooms = useSelector((store: iStore) => store.rooms);

    console.log('user: ' + user);
    console.log('rooms:' + rooms);
    
    return (
        <>
        <h1>Conversación</h1>

            <RoomList data={rooms[0].messages} />
        </>
    )
}