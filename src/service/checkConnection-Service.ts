import axios from "../api/axios";

export const checkConnection = async () => {
    try {
        return await (await axios.get('/checkConnection')).data;
    }
    catch (err: any) {
        throw err;
    }
}