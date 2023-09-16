import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../api/axios";
import Ipurchase from "../interface/purchase/Ipurchase";
import { initialPurchaseState } from "../store/reducer/purchaseSlice";
import { dispatch } from "../store/store";

export const getAllPurchases = createAsyncThunk('purchase/getAll',
    async () => {
        try {
            return await (await axiosPrivate.get('/purchase')).data;
        }
        catch (err: any) {
            throw error(err);
        }
        finally {
            setTimeOut();
        }
    }
)

export const getPurchase = createAsyncThunk('purchase/getById',
    async (id: any) => {
        try {
            return await (await axiosPrivate.get(`/purchase/${id}`)).data;
        }
        catch (err) {
            throw error(err);
        }
        finally {
            setTimeOut();
        }
    }
)
export const createNewPurchase = createAsyncThunk('purchase/create',
    async (data: Ipurchase) => {
        try {
            return await (await axiosPrivate.post('/purchase', data)).data;
        }
        catch (err: any) {
            throw error(err);
        }
        finally {
            setTimeOut();
        }
    }
)
export const updatePurchase = createAsyncThunk('purchase/Update',
    async (data: Ipurchase) => {
        try {
            return await (await axiosPrivate.put('/purchase', data)).data;
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
    setTimeout(() => { dispatch(initialPurchaseState()) }, 2000)
}
const error = (err: any) => {
    return {
        code: err.response.status.toString(),
        name: "Custom",
        message: err.response.data.message,
    }
}