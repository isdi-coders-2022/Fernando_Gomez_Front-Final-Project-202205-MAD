import { useSelector } from "react-redux";
import { iStore, iUser } from "../../interfaces/interfaces";
import { CreateGroupCard } from "../CreateGroupCard/create-group-card";
import { UserCard } from "../UserCard/user-card";
import styles from './index.module.css';

export function UsersList({ data, group }: { data: iUser[], group: boolean }) {
    const user = useSelector((store: iStore) => store.user[0]);


    const users = data.filter(item => item._id !== user._id);

    return (
        <ul className={styles.ul_container}>
            {group ? (

                users.map(item => (
                    <li key={item._id}>
                        <CreateGroupCard user={item} />
                    </li>
                ))

            ) : (

                users.map(item => (
                    <li key={item._id}>
                        <UserCard user={item} />
                    </li>
                ))

            )

            }

        </ul>
    )
}