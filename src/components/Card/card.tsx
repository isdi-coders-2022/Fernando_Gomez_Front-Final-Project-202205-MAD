import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../chat/chat-socket';
import { iRoom, iStore } from '../../interfaces/interfaces';
import { formatDate } from '../../utils/formatDate';
import { Avatar } from '../Avatar/avatar';
import styles from './card.module.css';

export function Card({ room }: { room: iRoom }) {
    const user = useSelector((store: iStore) => store.user[0]);
    const navigate = useNavigate();
    const users = useSelector((store: iStore) => store.users);
    const id1 = room.name?.substring(0, 24);
    const id2 = room.name?.substring(24, room.name.length);

    let otherId = '';
    user._id === id1 ? (otherId = id2 as string) : (otherId = id1 as string);

    const otherUser = users.find((user) => user._id === otherId);
    // TODO do the same in the other cards of groups and users
    const emitAndNavigate = () => {
        socket.emit('update-seen-messages', {
            otherUserId: otherUser?._id,
            token: user.token,
            roomId: room._id,
        });
        socket.emit('on-conversation', {
            userId: user._id,
            token: user.token,
            roomId: room?._id,
        });
        navigate(`/room/${room._id}`);
    };

    return (
        <>
            {(room.messages.length > 0 || room.type === 'group') && (
                <div
                    className={styles.card_container}
                    onClick={emitAndNavigate}
                >
                    <div className={styles.avatar_container}>
                        {room.type === 'p2p' ? (
                            <>
                                <div>
                                    <Avatar
                                        src={otherUser?.avatar as string}
                                        alt={otherUser?.nickname as string}
                                    />
                                </div>
                                <div className={styles.info_container}>
                                    <div className={styles.info1}>
                                        <div>
                                            <span>{otherUser?.nickname}</span>
                                            <span>
                                                {otherUser?.online ? (
                                                    <span className="text_green">
                                                        en línea...
                                                    </span>
                                                ) : (
                                                    ''
                                                )}
                                            </span>
                                        </div>
                                        <div>
                                            <span className={styles.date}>
                                                {formatDate(
                                                    room.messages[
                                                        room.messages.length - 1
                                                    ].createdAt as string
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.info2}>
                                        <span className={styles.message}>
                                            {
                                                room.messages[
                                                    room.messages.length - 1
                                                ].content
                                            }
                                        </span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <Avatar
                                        src={room.image as string}
                                        alt={room.name as string}
                                    />
                                </div>
                                <div className={styles.info_container}>
                                    <div className={styles.info1}>
                                        <div>
                                        <span>{room.name}</span>
                                        </div>
                                        <div></div>
                                    </div>
                                    <div className={styles.info2}>
                                        {room.messages.length > 0 && <></>}

                                        {room.messages.length === 0 && (
                                            <>
                                                <span
                                                    className={styles.message}
                                                >
                                                    {room.owner === user._id
                                                        ? `Has creado este grupo`
                                                        : `Has sido añadido a este grupo`}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
