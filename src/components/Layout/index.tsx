import { ReactNode, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux";
import { iRouterItem, iStore } from "../../interfaces/interfaces"
import { ApiChat } from "../../services/api";
import { Header } from "./Header/header";


export function Layout({
    children,
    navOptions,
}: {
    children: ReactNode;
    navOptions: iRouterItem[];
}){

    const user = useSelector((store: iStore) => store.user);
    
    return (
        <>
        {user.length !== 0 &&
            <Header navOptions={navOptions} />

        }
            <main>{children}</main>
        </>
    )
}