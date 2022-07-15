import { SyntheticEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../chat/chat-socket";
import { List } from "../../components/List";
import { iRoom, iStore } from "../../interfaces/interfaces";
import { addRoomAction, loadRoomsAction } from "../../reducers/room/action.creators";
import { ApiChat } from "../../services/api";
import styles from './index.module.css';

export default function HomePage(){
    const rooms = useSelector((store: iStore) => store.rooms);
    const apiChat = useMemo(() => new ApiChat(), []);
    const loggedUser = useSelector((store: iStore) => store.user[0]);
    const dispatcher = useDispatch();
    const [update,setUpdate] = useState('')

    socket.on('new-p2p-room', (payload: iRoom) => {
        setUpdate('')
        // dispatcher(addRoomAction(payload as iRoom));
    });
    // socket.on('new-group-room', (payload: iRoom) => {
    //     // dispatcher(addRoomAction(payload as iRoom));
    //     setUpdate('')
    //     // reload()
    // });

    socket.on('new-group-room', (payload: iRoom) => {
        // console.log(payload);
        dispatcher(addRoomAction(payload as iRoom));
        // if (payload.users[0] === loggedUser._id){
        //     navigate(`/room/${payload._id}`);
        // }
    })
   
    // const reload = useCallback(() => {
    //     const rooms = useSelector((store: iStore) => store.rooms);
        
    // }, [update]);
   

    // useEffect(() => {
    //     dispatcher(addRoomAction(payload as iRoom));
        
    // }, [dispatcher]);

    return (
        <>
            <h1 className={styles.h1}>Conversaciones</h1>
            <List data={rooms} />
        </>
    )
}

