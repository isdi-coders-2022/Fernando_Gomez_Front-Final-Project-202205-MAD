import { iRoom } from "../../interfaces/interfaces";
import { Card } from "../Card/card";
import styles from './index.module.css';

export function List({data}: {data: iRoom[]}) {
    return (
        <ul className={styles.ul_container} data-testid="1">
            {data.map(item => (
                <li key={item._id}>
                    <Card room={item}/>
                </li>
                ))
            }
        </ul>
    )
}