import axios from 'axios';
import store from '../store/store';
import { refresh as sliceRefresh } from "../service/authService";

const BASE_URL = 'http://localhost:3500';
const authToken = () => {
    return store.getState().auth.data.accessToken;
}

export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

axiosPrivate.interceptors.request.use((config: any) => {
    if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${authToken()}`;
    }
    return config;
}, (error) => Promise.reject(error));

axiosPrivate.interceptors.response.use(response => response, async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 403 && !prevRequest?.sent) {
        prevRequest.sent = true;
        await store.dispatch(sliceRefresh());
        prevRequest.headers['Authorization'] = `Bearer ${authToken()}`;
        return axiosPrivate(prevRequest);
    }
    return Promise.reject(error);
});





