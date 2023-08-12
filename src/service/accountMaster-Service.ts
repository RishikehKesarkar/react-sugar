import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../api/axios";
import store from "../store/store";
import { initialaccountState } from "../store/reducer/accountMasterSlice";
import Iaccount from "../interface/account/Iaccount";

export const getAllAccounts = createAsyncThunk('account/getAll',
    async () => {
        try {
            return await (await axiosPrivate.get('/accountMaster')).data;
        }
        catch (err) {
            throw error(err);
        }
        finally {
            setTimeOut();
        }
    }
)
export const getAccount = createAsyncThunk('account/get',
    async (id: any) => {
        try {
            return await (await axiosPrivate.get(`/accountMaster/${id}`)).data;
        }
        catch (err: any) {
            throw error(err);
        }
        finally {
            setTimeOut();
        }
    }
)
export const getAccountDetail = createAsyncThunk('accountDetail/get',
    async (id: any) => {
        try {
            return await (await axiosPrivate.get(`/accountMaster/accountDetail/${id}`)).data;
        }
        catch (err: any) {
            throw error(err);
        }
        finally {
            setTimeOut();
        }
    }
)
export const createNewAccount = createAsyncThunk('account/createNew',
    async (data: Iaccount) => {
        try {
            return await (await axiosPrivate.post('/accountMaster', data)).data;
        }
        catch (err: any) {
            throw error(err);
        }
        finally {
            setTimeOut();
        }
    }
)
export const updateAccount = createAsyncThunk('account/update',
    async (data: Iaccount) => {
        try {
            return await (await axiosPrivate.post('/accountMaster', data)).data;
        }
        catch (err: any) {
            throw error(err);
        }
        finally {
            setTimeOut();
        }
    }
)

const setTimeOut = () => {
    setTimeout(() => { store.dispatch(initialaccountState()) }, 2000)
}
const error = (err: any) => {
    return {
        code: err.response.status.toString(),
        name: "Custom",
        message: err.response.data.message,
    }
}