import { SyntheticEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { UsersList } from '../../components/UsersList';
import { iStore, iUser } from '../../interfaces/interfaces';
import styles from './index.module.css';

export default function UsersPage() {
    const users = useSelector((store: iStore) => store.users);

    const initResult: iUser[] = []
    const [search, setSearch] = useState(true);
    const [result, setResult] = useState(initResult);
    let results: iUser[] = [];

    const changeInput = (ev: SyntheticEvent) => {
        if ((ev.target as HTMLFormElement).value !== ''){
            results = users.filter((user) => user.nickname.includes((ev.target as HTMLFormElement).value));
            setResult(results);
            setSearch(false);
        } else{
            setSearch(true);
        }
    };

    return (
        <div className={styles.container}>
            <div>
                <input
                    onChange={changeInput}
                    type="text"
                    id="searchBar"
                    placeholder="🔍"
                />
            </div>
            <div>
                {search ? (
                    <UsersList data={users} />
                ) : (
                    <UsersList data={result} />
                )}
            </div>
        </div>
    );
}
