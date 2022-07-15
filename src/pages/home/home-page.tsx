import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../chat/chat-socket";
import { List } from "../../components/List";
import { iRoom, iStore } from "../../interfaces/interfaces";
import { loadRoomsAction } from "../../reducers/room/action.creators";
import { ApiChat } from "../../services/api";
import styles from './index.module.css';

export default function HomePage(){

    const rooms = useSelector((store: iStore) => store.rooms);
    const [update, setUpdate] = useState('');
    const apiChat = useMemo(() => new ApiChat(), []);
    const loggedUser = useSelector((store: iStore) => store.user[0]);
    const dispatcher = useDispatch();


    socket.on('new-p2p-room', (payload: iRoom) => {
        setUpdate('')
    });

    useEffect(() => {
        apiChat
                .getAllRoomsByUser(loggedUser._id as string, loggedUser.token as string)
                .then((rooms) => dispatcher(loadRoomsAction(rooms)));
    }, [update]);

    return (
        <>
            <h1 className={styles.h1}>Conversaciones</h1>
            <List data={rooms} />
        </>
    )
}


