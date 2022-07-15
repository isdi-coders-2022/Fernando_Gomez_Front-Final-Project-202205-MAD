import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Room } from '../../components/Room/room';
import { iMessage, iStore, iUser } from '../../interfaces/interfaces';
import { loadRoomsAction } from '../../reducers/room/action.creators';
import { ApiChat } from '../../services/api';

export default function GroupRoomPage() {
    const { id } = useParams();
    const user = useSelector((store: iStore) => store.user[0]);

    const rooms = useSelector((store: iStore) => store.rooms);
    const users = useSelector((store: iStore) => store.users);
    const room = rooms.find((room) => room._id === id);
    const apiChat = useMemo(() => new ApiChat(), []);

    // useEffect(() => {

    //     if (user) {
    //         apiChat
    //             .getAllRoomsByUser(user._id as string, user.token as string)
    //             .then((rooms) => dispatcher(loadRoomsAction(rooms)));
          
    //     }
    // }, [apiChat, user]);

    return (
        <>
                <h1>{room?.name}</h1>
            {rooms.length > 0 && (
                <Room
                    data={room?.messages as iMessage[]}
                    roomId={room?._id as string}
                />
            )}
        </>
    );
}


