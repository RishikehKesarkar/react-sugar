import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";
import store from "../store/store";
import { initialPage } from "../store/reducer/pagesSlice";

export const getAllpages = createAsyncThunk('pages/getAll',
    async () => {
        try {
            return await (await axios.get('/pages')).data;
        }
        catch (err: any) {
            throw error(err);
        }
        finally {
            setTimeOut();
        }
    }
)

export const getPage = createAsyncThunk('page/get',
    async (pageName: any) => {
        try {
            return await (await axios.get(`/pages/${pageName}`)).data;
        }
        catch (err: any) {
            throw error(err);
        }
        finally {
            setTimeOut();
        }
    }
)

export const createNewPage = createAsyncThunk('pages/createNew',
    async (data: any) => {
        try {
            return await (await axios.post('/pages', data)).data;
        }
        catch (err: any) {
            throw error(err);
        }
    }
)

export const updatePage = createAsyncThunk('company/Update',
    async (data: any) => {
        try {
            return await (await axios.put('/pages', data)).data;
        }
        catch (err: any) {
            throw error(err);
        }
    }
)

const setTimeOut = () => {
    setTimeout(() => { store.dispatch(initialPage()) }, 2000)
}

const error = (err: any) => {
    return {
        code: err.response.status.toString(),
        name: "Custom",
        message: err.response.data.message,
    }
}