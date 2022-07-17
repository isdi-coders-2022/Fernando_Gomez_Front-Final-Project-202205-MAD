import { iRoom } from "../../interfaces/interfaces";
import { Card } from "../Card/card";


export function List({data}: {data: iRoom[]}) {
    return (
        <ul data-testid="1">
            {data.map(item => (
                <li key={item._id}>
                    <Card room={item}/>
                </li>
                ))
            }
        </ul>
    )
}