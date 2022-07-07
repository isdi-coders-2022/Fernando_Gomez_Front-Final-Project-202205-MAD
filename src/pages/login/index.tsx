import { SyntheticEvent, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadRoomsAction } from "../../reducers/room/action.creators";
import { loadUsersAction } from "../../reducers/user/action.creators";
import { ApiChat } from "../../services/api";

export default function LoginPage(){

    const dispatcher = useDispatch();
    const apiChat = useMemo(() => new ApiChat(), []);

    const navigate = useNavigate();
    const initialState = {email: '', password: ''};
    const [formData, setFormData] = useState(initialState);

    const handleChange = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        const value = element.value;
        setFormData({...formData, [element.name]: value});
    };

    const handleSubmit = async (ev: SyntheticEvent) => {
        ev.preventDefault();
        const resp = await apiChat.login(formData);
        const rooms = await apiChat.getAllRoomsByUser(resp.user._id, resp.token);  // TODO fix this double rooms call

        dispatcher(loadUsersAction([resp]));
        dispatcher(loadRoomsAction(rooms)); // TODO fix this double rooms call

        navigate(`/`);
    }

    return (
        <>
            <form onSubmit={handleSubmit}       className="login-form">
                <label htmlFor="">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    onChange={handleChange}
                />
                <label htmlFor="">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
            </form>
        </>
    )
}