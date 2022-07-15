import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Room } from '../../components/Room/room';
import { iMessage, iStore } from '../../interfaces/interfaces';

export default function RoomPage() {
    const { id } = useParams();
    const user = useSelector((store: iStore) => store.user[0]);

    const rooms = useSelector((store: iStore) => store.rooms);
    const users = useSelector((store: iStore) => store.users);
    const room = rooms.find((room) => room._id === id);

    const id1 = room?.name?.substring(0, 24);
    const id2 = room?.name?.substring(24, room.name.length);

    let otherId = '';
    (user._id === id1) ? otherId = id2 as string : otherId = id1 as string;

    const otherUser = users.find(user => user._id === otherId);

    return (
        <>
            {room?.type === 'group' ? (
                <h1>{room.name}</h1>
            ) : (
                <h1>{otherUser?.nickname}</h1>
            )}
            {rooms.length > 0 && (
                <Room
                    data={room?.messages as iMessage[]}
                    roomId={room?._id as string}
                />
            )}
        </>
    );
}
