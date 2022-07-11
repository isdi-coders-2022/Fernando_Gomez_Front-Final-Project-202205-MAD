import { iUser } from "../../interfaces/interfaces";
import { UserCard } from "../UserCard";


export function UsersList({data}: {data: iUser[]}) {
    return (
        <ul>
            {data.map(item => (
                <li key={item.name}>
                    <UserCard user={item}/>
                </li>
                ))
            }
        </ul>
    )
}