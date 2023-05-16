import { createAsyncThunk } from "@reduxjs/toolkit";
import { initialStates } from "../store/reducer/stateMasterSlice";
import { dispatch } from "../store/store";
import { axiosPrivate } from "../api/axios";

export const stateMaster_GetAll = createAsyncThunk('state/getAll',
    async () => {
        try {
            return await (await axiosPrivate.get('/stateMaster')).data;
        } catch (err: any) {
            throw error(err);
        }
        finally {
            setTimeout(() => { dispatch(initialStates()) }, 3000)
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