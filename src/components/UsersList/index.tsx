import { useSelector } from "react-redux";
import { iStore, iUser } from "../../interfaces/interfaces";
import { UserCard } from "../UserCard";


export function UsersList({data}: {data: iUser[]}) {
    const user = useSelector((store: iStore) => store.user[0]);
    

    const users = data.filter(item => item._id !== user._id);

    return (
        <ul>
            {users.map(item => (
                <li key={item.name}>
                    <UserCard user={item}/>
                </li>
                ))
            }
        </ul>
    )
}