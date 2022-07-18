import { ReactNode } from "react"
import { useSelector } from "react-redux";
import { iRouterItem, iStore } from "../../interfaces/interfaces"
import { Header } from "./Header/header";
import styles from './index.module.css';

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
            <main className={styles.main}>{children}</main>
        </>
    )
}