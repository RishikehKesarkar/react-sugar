import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../api/axios";
import { initialGstState } from "../store/reducer/gstMasterSlice";
import { dispatch } from "../store/store";

export const getAllgst = createAsyncThunk('gst/getAll',
    async () => {
        try {
            return await (await axiosPrivate.get('/gstMaster')).data;
        }
        catch (err) {
            throw error(err);
        }
        finally {
            setTimeOut();
        }
    }
)
export const getGst = createAsyncThunk('gst/getById',
    async (id: number) => {
        try {
            return await (await axiosPrivate.get(`/gstMaster/${id}`)).data;
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
    setTimeout(() => { dispatch(initialGstState()) }, 2000)
}
const error = (err: any) => {
    return {
        code: err.response.status.toString(),
        name: "Custom",
        message: err.response.data.message,
    }
}