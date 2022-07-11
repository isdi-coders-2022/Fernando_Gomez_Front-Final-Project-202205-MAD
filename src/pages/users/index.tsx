import { useSelector } from "react-redux";
import { UsersList } from "../../components/UsersList";
import { iStore } from "../../interfaces/interfaces";

export default function UsersPage(){
    

    const users = useSelector((store: iStore) => store.users);

    return (
        <>
        <h1>Usuarios</h1>
            <UsersList data={users} />
        </>
    )
}