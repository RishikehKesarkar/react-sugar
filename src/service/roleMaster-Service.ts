import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { authHeader } from "../api/axios";
import { initialroleState } from "../store/reducer/roleMasterSlice";
import store from "../store/store";

export const getAllRoles = createAsyncThunk('role/getAll',
    async () => {
        try {
            return await (await axios.get('/roleMaster', { headers: authHeader() })).data;
        }
        catch (err: any) {
            throw error(err);
        }
        finally {
            setTimeout(() => { store.dispatch(initialroleState()) }, 3000)
        }
    }
)

export const getRole = createAsyncThunk('role/get',
    async (id: any) => {
        try {
            return await (await axios.get(`/roleMaster/${id}`, { headers: authHeader() })).data;
        }
        catch (err: any) {
            throw error(err);
        }
        finally {
            setTimeout(() => { store.dispatch(initialroleState()) }, 3000)
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