import { useSelector } from "react-redux";
import { List } from "../../components/List";
import { iStore } from "../../interfaces/interfaces";

export default function HomePage(){

    const users = useSelector((store: iStore) => store.users);
    const rooms = useSelector((store: iStore) => store.rooms);

    

    return (
        <>
        <h3>User: {users[0].name}</h3>
        <h1>Conversaciones</h1>
            <List data={rooms} />
        </>
    )
}