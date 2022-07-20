import { TextField } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { iUser } from '../../interfaces/interfaces';
import { UsersList } from '../UsersList/users-list';
import styles from './search-box.module.css';

export function SearchBox({ users }: { users: iUser[] }) {
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
        <>
            
        </>
    );
}
