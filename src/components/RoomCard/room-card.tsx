import { useSelector } from 'react-redux';
import { iMessage, iStore } from '../../interfaces/interfaces';
import { formatDate } from '../../utils/formatDate';
import styles from './room-card.module.css';

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

    return rtype === 'p2p' ? (
        <div
            className={
                user._id === sender?._id
                    ? `${styles.card_container} ${styles.mine}`
                    : `${styles.card_container} ${styles.not_mine}`
            }
        >
            <div>
                <span>
                    <span>
                        {user._id === sender?._id ? (
                            message.seen === true ? (
                                <img
                                    src="/assets/check-blue.png"
                                    alt="seen message"
                                />
                            ) : (
                                <img
                                    src="/assets/check-black.png"
                                    alt="unseen message"
                                />
                            )
                        ) : (
                            ''
                        )}
                    </span>{' '}
                    {date}
                </span>
            </div>
            <div>
                <span className={styles.message}>{message.content}</span>
            </div>
        </div>
    ) : (
        <div
            className={
                user._id === sender?._id
                    ? `${styles.card_container} ${styles.mine}`
                    : `${styles.card_container} ${styles.not_mine}`
            }
        >
            <div>
                <span>{date}</span>
            </div>
            <div>
                <span className={styles.message}>{message.content}</span>
            </div>
        </div>
    );
}
