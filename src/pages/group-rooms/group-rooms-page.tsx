import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { List } from '../../components/List/list';
import { iRoom, iStore } from '../../interfaces/interfaces';
import { dateToNumber } from '../../utils/dateToNumber';
import styles from './group-rooms-page.module.css';

export default function GroupRoomsPage() {
    const rooms = useSelector((store: iStore) => store.rooms);
    const selectedRooms: iRoom[] = rooms.filter(
        (room) => room.type === 'group'
    );

    const compare = (a: iRoom, b: iRoom) => {
        if (
            a.messages[a.messages.length - 1] === undefined ||
            b.messages[b.messages.length - 1] === undefined
        ) {
            return 1;
        }
        const dateA = dateToNumber(
            a.messages[a.messages.length - 1].createdAt as string
        );
        const dateB = dateToNumber(
            b.messages[b.messages.length - 1].createdAt as string
        );
        return dateA < dateB;
    };

    const sortedRooms = [...selectedRooms].sort((a, b) => +compare(a, b));

    return (
        <div className={styles.container}>
            <div className={styles.create}>
                <Link to={`/create-group`}>
                    <Button variant="contained" size="small">
                        Crear un grupo
                    </Button>
                </Link>
            </div>
            <h1 className={styles.h1}>Grupos</h1>
            <List data={sortedRooms} />
        </div>
    );
}
