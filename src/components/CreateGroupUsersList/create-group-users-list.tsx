import { useSelector } from 'react-redux';
import { iStore, iUser } from '../../interfaces/interfaces';
import { CreateGroupCard } from '../CreateGroupCard/create-group-card';
import styles from './index.module.css';

export function CreateGroupUsersList({
    data,
    group,
}: {
    data: iUser[];
    group: boolean;
}) {
    const user = useSelector((store: iStore) => store.user[0]);

    const users = data.filter((item) => item._id !== user._id);

    return (
        <ul className={styles.ul_container}>
            {users.map((item) => (
                <li key={item._id}>
                    <CreateGroupCard user={item} />
                </li>
            ))}
        </ul>
    );
}
