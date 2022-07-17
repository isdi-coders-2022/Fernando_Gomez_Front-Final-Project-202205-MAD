import { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { iStore, iUser } from "../../interfaces/interfaces";
import { addGroupUserAction, deleteGroupUserAction } from "../../reducers/group-room/action.creators";
import styles from './index.module.css';

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
            <div className={styles.card_container} onClick={handleClick}>
                <p>
                    {user.nickname}
                </p>

                {added ? (
                    <span onClick={handleClick} >añadido</span>
                ) : (
                    <span onClick={handleClick}>añadir</span>
                )
                }
            </ div>

        </>
    )
}
