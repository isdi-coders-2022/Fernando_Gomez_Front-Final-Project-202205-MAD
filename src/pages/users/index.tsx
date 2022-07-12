import { useSelector } from "react-redux";
import { UsersList } from "../../components/UsersList";
import { iStore } from "../../interfaces/interfaces";
import styles from './index.module.css'

export default function UsersPage(){
    

    const users = useSelector((store: iStore) => store.users);

    return (
        <div className={styles.container}>
            <UsersList data={users} />
        </ div>
    )
}