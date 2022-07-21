import { Avatar } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { iStore, iUser } from "../../interfaces/interfaces";
import { addGroupUserAction, deleteGroupUserAction } from "../../reducers/group-room/action.creators";
import styles from './create-group-card.module.css';

export function CreateGroupCard({ user }: { user: iUser }) {
    const groupRoom = useSelector((store: iStore) => store.groupRoom);
    const dispatcher = useDispatch();

    const participant = groupRoom.find(u => u === user._id);
    let initState: boolean;
    (participant) ? initState = true : initState = false;

    const [added, setAdded] = useState(initState);

    const handleClick = (ev: SyntheticEvent) => {
        ev.preventDefault();
        if (!added) {
            setAdded(!added);
            dispatcher(addGroupUserAction(user._id as string));
        } else {
            setAdded(!added);
            dispatcher(deleteGroupUserAction(user._id as string));
        }
    }

    return (
        <>
            <div className={styles.card_container} onClick={handleClick} data-testid="create-group-card">
                <div>
                    <span className={styles.avatar_container}>
                        <Avatar
                            src={user.avatar as string}
                            alt={user.nickname}
                        />
                    </span>
                </div>
                <div className={styles.info_container}>
                    <span>{user.nickname}</span>
                    {added ? (
                    <span onClick={handleClick} className={styles.added} >seleccionado</span>
                ) : (
                    <span onClick={handleClick} className={styles.non_added}>seleccionar</span>
                )
                }
                </div>
            </div>

        </>
    )
}
