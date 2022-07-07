import { useSelector } from "react-redux";
import { List } from "../../components/List";
import { iStore } from "../../interfaces/interfaces";

export default function HomePage(){

    const user = useSelector((store: iStore) => store.users);
    const rooms = useSelector((store: iStore) => store.rooms);

    console.log('user: ' + user);
    console.log('rooms:' + rooms);
    
    return (
        <>
        <h1>Conversaciones</h1>
            <List data={rooms} />
        </>
    )
}