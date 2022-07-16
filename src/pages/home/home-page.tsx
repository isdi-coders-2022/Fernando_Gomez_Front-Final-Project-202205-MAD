import {
    SyntheticEvent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../chat/chat-socket';
import { List } from '../../components/List';
import { iRoom, iStore } from '../../interfaces/interfaces';
import {
    addRoomAction,
    loadRoomsAction,
    updateRoomAction,
} from '../../reducers/room/action.creators';
import { ApiChat } from '../../services/api';
import { dateToNumber } from '../../utils/dateToNumber';
import styles from './index.module.css';

export default function HomePage() {
    const rooms = useSelector((store: iStore) => store.rooms);
    const dispatcher = useDispatch();

    const compare = (a: iRoom, b: iRoom) => {
        if (a.messages[a.messages.length -1] === undefined || b.messages[b.messages.length -1] === undefined) {
            return 1;
        }
        const dateA = dateToNumber(a.messages[a.messages.length -1].createdAt as string);
        const dateB = dateToNumber(b.messages[b.messages.length -1].createdAt as string);
        return dateA < dateB;
    };

    const sortedRooms = [...rooms].sort((a, b) => +compare(a, b));

    socket.on('new-group-room', (payload: iRoom) => {
        dispatcher(addRoomAction(payload as iRoom));
    });

    return (
        <>
            <h1 className={styles.h1}>Conversaciones</h1>
            <List data={sortedRooms} />
        </>
    );
}
