import { iMessage, iStore } from '../../interfaces/interfaces';
import { RoomCard } from '../RoomCard/room-card';
import { socket } from '../../chat/chat-socket';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './room.module.css';

export function Room({ roomId, data }: { roomId: string; data: iMessage[] }) {
    const rooms = useSelector((store: iStore) => store.rooms);

    const user = useSelector((store: iStore) => store.user[0]);
    const users = useSelector((store: iStore) => store.users);

    const room = rooms.find((room) => roomId === room._id);

    const id1 = room?.name?.substring(0, 24);
    const id2 = room?.name?.substring(24, room.name.length);

    let otherId = '';
    user._id === id1 ? (otherId = id2 as string) : (otherId = id1 as string);

    const initialFormData = '';

    const [formData, setFormData] = useState(initialFormData);
    const handleChange = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormData(element.value);
    };

    const otherUser = users.find((user) => user._id === otherId);

    const seen = otherUser?.onConversation === roomId ? true : false;

    const handleSubmit = useCallback(
        async (ev: SyntheticEvent) => {
            ev.preventDefault();

            const newMessage: iMessage = {
                _id: '',
                createdAt: JSON.stringify(new Date()),
                sender: user._id as string,
                recipient: otherId as string,
                content: formData,
                seen: seen,
            };

            let array = JSON.stringify(room?.messages);
            let newArray = JSON.parse(array);
            newArray?.push(newMessage);

            socket.emit('message', {
                message: newMessage,
                roomId: room?._id as string,
            });
            setFormData('');
        },
        [formData]
    );

    socket.on('message', (payload) => {
        if (payload._id === room?._id) {
            const el = document.querySelector('#ul-container');
            if (el) {
                el.scrollTop = el.scrollHeight;
            }
        }
    });

    useEffect(() => {
        const elem = document.querySelector('#ul-container');
        if (elem) {
            elem.scrollTop = elem.scrollHeight;
        }
    });

    return (
        <>
            <div id="ul-container" className={styles.ul_container}>
                <ul id="ul" className={styles.ul} data-testid="room">
                    {room?.messages.map((item) => {
                        return (
                            <li key={item.createdAt} className={styles.list}>
                                <RoomCard
                                    message={item}
                                    rtype={room.type as string}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div>
                        <input
                            id="input-box"
                            className={styles.input_box}
                            type="text"
                            name="name"
                            placeholder="Mensaje..."
                            onChange={handleChange}
                            required
                            value={formData}
                            autoFocus
                        />
                    </div>
                    <div>
                        <button type="submit">
                            <img
                                className={styles.send}
                                src="/assets/send.png"
                                alt="Enviar"
                            />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
