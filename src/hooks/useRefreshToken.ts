import { useDispatch } from 'react-redux';
import axios from '../api/axios';
import useAuth from './useAuth';
import { setAuth as sliceAuth } from '../store/reducer/authSlice';
const useRefreshToken = () => {
    const { setAuth }: any = useAuth();
    const dispatch=useDispatch();
    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        await setAuth((prev: any) => {
            return {
                ...prev,
                userName:response.data.userName,
                roles: response.data.pages,
                accessToken: response.data.accessToken
            }
        });
        await dispatch(sliceAuth(response.data));
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
