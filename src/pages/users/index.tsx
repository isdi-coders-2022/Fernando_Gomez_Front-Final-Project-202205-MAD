import { useState } from "react";
import { useSelector } from "react-redux";
import { UsersList } from "../../components/UsersList";
import { iStore } from "../../interfaces/interfaces";
import styles from './index.module.css'

export default function UsersPage(){
    const users = useSelector((store: iStore) => store.users);

    const [search, setSearch] = useState(true) ;
    const results = users.filter(user => user.name.includes('Migu'))

console.log('users: ', users);
console.log('results: ', results);


    return (
        <div className={styles.container}>
            {search ? (
                <UsersList data={users} />
            ) : (
                <UsersList data={results} />
            )

            }
                
           
        </ div>
    )
}