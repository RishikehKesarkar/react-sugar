import { createAsyncThunk } from "@reduxjs/toolkit";
import { initialroleState } from "../store/reducer/roleMasterSlice";
import store from "../store/store";
import { axiosPrivate } from "../api/axios";

export const getAllRoles = createAsyncThunk('role/getAll',
    async () => {
        try {
            return await (await axiosPrivate.get('/roleMaster')).data;
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
            return await (await axiosPrivate.get(`/roleMaster/${id}`)).data;
        }
        catch (err: any) {
            throw error(err);
        }
        finally {
            setTimeout(() => { store.dispatch(initialroleState()) }, 3000)
        }
    }
)

export const createNewRole = createAsyncThunk('role/createNew',
    async (data: any) => {
        try {
            return await (await axiosPrivate.post('/roleMaster', data)).data;
        }
        catch (err: any) {
            throw error(err);
        }
        finally {
            setTimeout(() => { store.dispatch(initialroleState()) }, 3000)
        }
    }
)

export const updateRole = createAsyncThunk('role/update',
    async (data: any) => {
        try {
            return await (await axiosPrivate.put('/roleMaster', data)).data;
        }
        catch (err: any) {
            throw error(err);
        }
        finally {
            setTimeout(() => { store.dispatch(initialroleState()) }, 3000)
        }
    }
)

export const deleteRole = createAsyncThunk('role/delete',
    async (id: any) => {
        try {
            return await (await axiosPrivate.delete('/roleMaster', { data: { Id: id } })).data;
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