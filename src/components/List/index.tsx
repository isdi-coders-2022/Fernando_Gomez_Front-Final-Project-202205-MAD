import { iRoom } from "../../interfaces/interfaces";
import { Card } from "../Card";


export function List({data}: {data: iRoom[]}) {
    return (
        <ul>
            {data.map(item => (
                <li key={item.name}>
                    <Card room={item}/>
                </li>
                ))
            }
        </ul>
    )
}