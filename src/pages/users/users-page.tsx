import { SyntheticEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UsersList } from '../../components/UsersList/users-list';
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
            <Link to={`/create-group`} >
                <button>
                    Crear un grupo
                </button>
            </Link>
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
                    <UsersList data={users} group={false} />
                ) : (
                    <UsersList data={result} group={false} />
                )}
            </div>
        </div>
    );
}
