import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { axiosPrivate } from "../api/axios";

export const getAllMenu = createAsyncThunk('menu/getAll',
    async (roleId: any) => {
        try {
            return await (await axios.get(`/menu/${roleId}`)).data;
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