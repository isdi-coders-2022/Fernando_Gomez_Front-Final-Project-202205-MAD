import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { socket } from '../../chat/chat-socket';
import { iRoom, iStore } from '../../interfaces/interfaces';
import { formatDate } from '../../utils/formatDate';
import styles from './index.module.css';

export function Card({ room }: { room: iRoom }) {
    const user = useSelector((store: iStore) => store.user[0]);
    const navigate = useNavigate()
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
            roomId: room._id
        });
        socket.emit('on-conversation', {
            userId: user._id,
            token: user.token,
            roomId: room?._id
        })
        navigate(`/room/${room._id}`);
    }

    return (
        <>
            {(room.messages.length > 0 || room.type === 'group') && (
                    <div className={styles.card_container} onClick={emitAndNavigate}>
                        <div>
                            <div>
                                {room.type !== 'group' ? (
                                    <span>{otherUser?.nickname} {(otherUser?.online) ? <span className='text_green'>en línea...</span> : ''} </span>
                                ) : (
                                    <span>{room.name}</span>
                                )}
                            </div>
                            <div>
                                {room.messages.length > 0 && (
                                    <>
                                        <p className={styles.date}>
                                            {formatDate(
                                                room.messages[
                                                    room.messages.length - 1
                                                ].createdAt as string
                                            )}
                                        </p>
                                        <p className={styles.message}>
                                            {
                                                room.messages[
                                                    room.messages.length - 1
                                                ].content
                                            }
                                        </p>
                                    </>
                                )}

                                {room.messages.length === 0 && (
                                    <>
                                        <p className={styles.message}>
                                            {room.owner === user._id ? (
                                                `Has creado este grupo`
                                            ) : (
                                                `Has sido añadido a este grupo`
                                            )

                                            }
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
            )}
        </>
    );
}
