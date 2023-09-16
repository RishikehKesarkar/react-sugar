import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../api/axios";

export const getAllitem = createAsyncThunk('item/getAll',
    async () => {
        try {
            return await (await axiosPrivate.get('/itemMaster')).data;
        }
        catch (err) {
            throw error(err);
        }
        finally {
            setTimeOut();
        }
    }
)

const setTimeOut = () => {
    //setTimeout(() => { dispatch(initialGstState()) }, 2000)
}
const error = (err: any) => {
    return {
        code: err.response.status.toString(),
        name: "Custom",
        message: err.response.data.message,
    }
}