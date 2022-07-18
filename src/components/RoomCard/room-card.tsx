import { useSelector } from 'react-redux';
import { iMessage, iStore } from '../../interfaces/interfaces';
import { formatDate } from '../../utils/formatDate';
import styles from './index.module.css';

export function RoomCard({
    message,
    rtype,
}: {
    message: iMessage;
    rtype: string;
}) {
    const user = useSelector((store: iStore) => store.user[0]);
    const users = useSelector((store: iStore) => store.users);

    const date = formatDate(message.createdAt as string);
    const sender = users.find((user) => user._id === message.sender);

    let info: string = '';
    if (user._id === sender?._id) {
        if (message.seen === true) {
            info = 'visto';
        } else {
            info = 'no visto';
        }
    }

    const temp = rtype;

    return rtype === 'p2p' ? (
        <div
            className={
                user._id === sender?._id
                    ? `${styles.card_container} ${styles.mine}`
                    : `${styles.card_container} ${styles.not_mine}`
            }
        >
            <p className={styles.date}>
                <span>{info}</span> {date}
            </p>
            <p className={styles.message}>{message.content}</p>
        </div>
    ) : (
        <div
            className={
                user._id === sender?._id
                    ? `${styles.card_container} ${styles.mine}`
                    : `${styles.card_container} ${styles.not_mine}`
            }
        >
            <p className={styles.date}>
                 {date}
            </p>
            <p className={styles.message}>{message.content}</p>
        </div>
    );
}
