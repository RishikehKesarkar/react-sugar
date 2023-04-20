import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const getAllpages = createAsyncThunk('pages/getAll',
    async () => {
        try {
            return await (await axios.get('/pages')).data;
        }
        catch (err: any) {
            throw error(err);
        }
    }
)

export const createNewPages = createAsyncThunk('pages/new',
    async (data:any) => {
        try {
            return await (await axios.post('/pages',data)).data;
        }
        catch (err: any) {
            throw error(err);
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