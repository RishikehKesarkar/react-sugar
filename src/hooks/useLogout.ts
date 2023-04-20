import axios from "../api/axios";
import { initialAuth } from "../store/reducer/authSlice";
import store from "../store/store";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth }: any = useAuth();

    const logout = async () => {
        setAuth({});
        store.dispatch(initialAuth("clear"));
        try {
            const response = await axios('/logout', {
                withCredentials: true
            });
            console.log("response",response);
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout