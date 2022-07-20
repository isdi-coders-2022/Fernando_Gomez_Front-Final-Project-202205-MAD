import { Button, TextField } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UsersList } from '../../components/UsersList/users-list';
import { iStore, iUser } from '../../interfaces/interfaces';
import styles from './users-page.module.css';

export default function UsersPage() {
    const users = useSelector((store: iStore) => store.users);

    const initResult: iUser[] = [];
    const [search, setSearch] = useState(true);
    const [result, setResult] = useState(initResult);
    let results: iUser[] = [];

    const changeInput = (ev: SyntheticEvent) => {
        if ((ev.target as HTMLFormElement).value !== '') {
            results = users.filter((user) =>
                user.nickname.includes((ev.target as HTMLFormElement).value)
            );
            setResult(results);
            setSearch(false);
        } else {
            setSearch(true);
        }
    };

    

    return (
        <div className={styles.container}>
            <div className={styles.create}>
                <Link to={`/create-group`}>
                    <Button variant="contained" size="small">
                        Crear un grupo
                    </Button>
                </Link>
            </div>
            <div>
                <div className={styles.search_box}>
                    <TextField
                        type="text"
                        id="searchBar"
                        onChange={changeInput}
                        label="🔍"
                        variant="outlined"
                        size="small"
                    />
                </div>
            </div>
            {search ? (
                    <UsersList data={users} group={false} />
                ) : (
                    <UsersList data={result} group={false} />
                )}
        </div>
    );
}
