import http from "../common/util/http-common";
import { createAsyncThunk } from "@reduxjs/toolkit";
import IroleMaster from "../interfaces/role/IroleMaster";

export const roleMaster_GetAll = createAsyncThunk('role/getAll',
    async () => {
        return await (await http.get("/roleMaster_GetAll")).data;
    }
)

export const roleMaster_GetById = createAsyncThunk('role/getById',
    async (Id:any) => {
        return await (await http.get(`/roleMaster_GetById/${Id}`)).data;
    }
)

export const roleMaster_Save = createAsyncThunk('role/Save',
    async (data:IroleMaster) => {
        console.log("roleData",data);
        return await (await http.post("/roleMaster_SaveEdit",data)).data;
    }
)