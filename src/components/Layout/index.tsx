import { ReactNode, useMemo } from "react"
import { useDispatch } from "react-redux";
import { iRouterItem } from "../../interfaces/interfaces"
import { ApiChat } from "../../services/api";
import { Footer } from "./Footer";
import { Header } from "./Header";


export function Layout({
    children,
    navOptions,
}: {
    children: ReactNode;
    navOptions: iRouterItem[];
}){

    const dispatcher = useDispatch();
    const apiChat = useMemo(() => new ApiChat(), []);
    
    return (
        <>
            <Header navOptions={navOptions} />
            <main>{children}</main>
            <Footer />
        </>
    )
}