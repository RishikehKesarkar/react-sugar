import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { authHeader } from "../api/axios";
import { initialcompanyState } from "../store/reducer/companyMasterSlice";
import store from "../store/store";

export const getAllCompanys = createAsyncThunk('company/getAll',
    async () => {
        try {
            return await (await axios.get('/companyMaster', { headers: authHeader() })).data;
        }
        catch (err: any) {
            throw error(err);
        }
        finally {
            setTimeout(() => { store.dispatch(initialcompanyState()) }, 3000)
        }
    }
)

export const getCompany = createAsyncThunk('company/get',
    async (id) => {
        try {
            return await (await axios.get(`/companyMaster/${id}`, { headers: authHeader() })).data;
        }
        catch (err: any) {
            throw error(err);
        }
        finally {
            setTimeout(() => { store.dispatch(initialcompanyState()) }, 3000)
        }
    }
)

export const createNewCompany = createAsyncThunk('company/createNew',
    async (data:any) => {
        try {
            return await (await axios.post('/companyMaster',data, { headers: authHeader() })).data;
        }
        catch (err: any) {
            throw error(err);
        }
        finally {
            setTimeout(() => { store.dispatch(initialcompanyState()) }, 3000)
        }
    }
)

export const updateCompany = createAsyncThunk('company/Update',
    async (data) => {
        try {
            return await (await axios.put('/companyMaster',data, { headers: authHeader() })).data;
        }
        catch (err: any) {
            throw error(err);
        }
        finally {
            setTimeout(() => { store.dispatch(initialcompanyState()) }, 3000)
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