import axios from 'axios';
import store from '../store/store';

const BASE_URL = 'http://localhost:3500';

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

export const authHeader = () => {
    //const token = sessionStorage.getItem("AccTkn");
    const token=store.getState().auth.data.accessToken;
    return { Authorization: `Bearer ${token}` } //document.cookie.split('=')[1]
}




