import { useSelector } from 'react-redux';
import { List } from '../../components/List/list';
import { iRoom, iStore } from '../../interfaces/interfaces';

import { dateToNumber } from '../../utils/dateToNumber';
import styles from './index.module.css';

export default function HomePage() {
    const rooms = useSelector((store: iStore) => store.rooms);

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

    const sortedRooms = [...rooms].sort((a, b) => +compare(a, b));

    return (
        <>
            <h1 className={styles.h1} data-testid="home-page">
                Conversaciones
            </h1>
            <List data={sortedRooms} />
        </>
    );
}
