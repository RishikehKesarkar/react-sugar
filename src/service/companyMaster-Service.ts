import { createAsyncThunk } from "@reduxjs/toolkit";
import { initialcompanyState } from "../store/reducer/companyMasterSlice";
import store from "../store/store";
import { axiosPrivate } from "../api/axios";
import IcompanyMaster from "../interface/company/Icompany";

export const getAllCompanys = createAsyncThunk('company/getAll',
    async () => {
        try {
            return await (await axiosPrivate.get('/companyMaster')).data;
        }
        catch (err: any) {
            throw error(err);
        }
        finally {
            setTimeOut();
        }
    }
)

export const getCompany = createAsyncThunk('company/get',
    async (id: any) => {
        try {
            return await (await axiosPrivate.get(`/companyMaster/${id}`)).data;
        }
        catch (err: any) {
            throw error(err);
        }
        finally {
            setTimeOut();
        }
    }
)

export const createNewCompany = createAsyncThunk('company/createNew',
    async (data: IcompanyMaster) => {
        try {
            return await (await axiosPrivate.post('/companyMaster', data)).data;
        }
        catch (err: any) {
            throw error(err);
        }
        finally {
            setTimeOut();
        }
    }
)

export const updateCompany = createAsyncThunk('company/Update',
    async (data:IcompanyMaster) => {
        try {
            return await (await axiosPrivate.put('/companyMaster', data)).data;
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
    setTimeout(() => { store.dispatch(initialcompanyState()) }, 2000)
}
const error = (err: any) => {
    return {
        code: err.response.status.toString(),
        name: "Custom",
        message: err.response.data.message,
    }
}