import { useSelector } from "react-redux";
import { iStore, iUser } from "../../interfaces/interfaces";
import { CreateGroupCard } from "../CreateGroupCard/create-group-card";
import { UserCard } from "../UserCard/user-card";


export function UsersList({ data, group }: { data: iUser[], group: boolean }) {
    const user = useSelector((store: iStore) => store.user[0]);


    const users = data.filter(item => item._id !== user._id);

    return (
        <ul>
            {group ? (

                users.map(item => (
                    <li key={item._id}>
                        <CreateGroupCard user={item} />
                        {/* <p>create group card</p> */}
                    </li>
                ))

            ) : (

                users.map(item => (
                    <li key={item._id}>
                        <UserCard user={item} />
                        {/* <p>user card 1</p> */}
                    </li>
                ))

            )

            }

        </ul>
    )
}