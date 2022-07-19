import { Button, TextField } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SearchBox } from '../../components/SearchBox/search-box';
import { UsersList } from '../../components/UsersList/users-list';
import { iStore, iUser } from '../../interfaces/interfaces';
import styles from './users-page.module.css';

export default function UsersPage() {
    const users = useSelector((store: iStore) => store.users);

    

    

    return (
        <div className={styles.container}>
            <div className={styles.create}>
                <Link to={`/create-group`}>
                    <Button variant="contained" size="small">
                        Crear un grupo
                    </Button>
                </Link>
            </div>
            <SearchBox users={users} />
            
        </div>
    );
}
