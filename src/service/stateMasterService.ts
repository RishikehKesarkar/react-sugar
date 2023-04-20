import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axios from "../api/axios";
import { authHeader } from "../api/axios";
import { initialStates } from "../store/reducer/stateMasterSlice";
import store from "../store/store";

export const stateMaster_GetAll = createAsyncThunk('state/getAll',
    async () => {
        try {
            return await (await axios.get('/stateMaster', { headers: authHeader() })).data;
        } catch (err: any) {
            throw error(err);
        }
        finally {
            setTimeout(() => { store.dispatch(initialStates()) }, 3000)
        }
    }
)

const error = (err: any) => {
    return {
        code: err.response.status.toString(),
        name: "Custom",
        message: err.response.data.message,
    }
}