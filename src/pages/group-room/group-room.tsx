import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Room } from '../../components/Room/room';
import { iMessage, iStore } from '../../interfaces/interfaces';

export default function GroupRoomPage() {
    const { id } = useParams();

    const rooms = useSelector((store: iStore) => store.rooms);
    const room = rooms.find((room) => room._id === id);

    return (
        <>
                <h1 data-testid="2">{room?.name}</h1>
            {rooms.length > 0 && (
                <Room
                    data={room?.messages as iMessage[]}
                    roomId={room?._id as string}
                />
            )}
        </>
    );
}


