import { useSelector } from "react-redux";
import { List } from "../../components/List";
import { iStore } from "../../interfaces/interfaces";
import styles from './index.module.css';

export default function HomePage(){

    const rooms = useSelector((store: iStore) => store.rooms);

    return (
        <>
        <h1 className={styles.h1}>Conversaciones</h1>
            <List data={rooms} />
        </>
    )
}