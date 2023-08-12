import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../api/axios";
import { initialCityState } from "../store/reducer/cityMasterSlice";
import { dispatch, getState } from "../store/store";
import IcityMaster from "../interface/cityMaster/IcityMaster";

export const getAllCities = createAsyncThunk('city/getAll',
    async () => {
        try {
            return await (await axiosPrivate.get('/cityMaster')).data;
        }
        catch (err) {
            throw error(err);
        }
        finally {
            setTimeOut();
        }
    }
)
export const getCity = createAsyncThunk('city/getById',
    async (id: any) => {
        try {
            return await (await axiosPrivate.get(`/cityMaster/${id}`)).data;
        }
        catch (err) {
            throw error(err);
        }
        finally {
            setTimeOut();
        }
    }
)
export const createNewCity = createAsyncThunk('city/createNew',
    async (data: IcityMaster) => {
        try {
            return await (await axiosPrivate.post('/cityMaster', data)).data;
        }
        catch (err: any) {
            throw error(err);
        }
        finally {
            setTimeOut();
        }
    }
)
export const updateCity = createAsyncThunk('city/update',
    async (data: IcityMaster) => {
        try {
            return await (await axiosPrivate.put('/cityMaster', data)).data;
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
    setTimeout(() => { dispatch(initialCityState()) }, 2000)
}
const error = (err: any) => {
    return {
        code: err.response.status.toString(),
        name: "Custom",
        message: err.response.data.message,
    }
}