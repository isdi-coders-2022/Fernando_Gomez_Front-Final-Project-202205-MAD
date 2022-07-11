import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { List } from "../../components/List";
import { iStore, iUser } from "../../interfaces/interfaces";
import { LocalStoreService } from "../../services/local-storage";

export default function HomePage(){
    // const localStorage = useMemo(() => new LocalStoreService(), []);
    // const user: iUser = localStorage.getUser();
    // const navigate = useNavigate();
    //     if(!user){
    //         navigate('/login');
    //     }

    const user = useSelector((store: iStore) => store.user[0]);

    const rooms = useSelector((store: iStore) => store.rooms);

    return (
        <>
        <h3>User: {user.nickname}</h3>
        <h1>Conversaciones</h1>
            <List data={rooms} />
        </>
    )
}