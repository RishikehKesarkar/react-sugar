import http from "../common/util/http-common";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Icompany from "../interfaces/company/Icompany";

export const companyMaster_GetAll = createAsyncThunk('company/getAll',
  async () => {
    return await (await http.get("/companyMaster_GetAll")).data;
  }
)

export const companyMaster_Save = createAsyncThunk('company/Save',
  async (data: Icompany) => {
    const response=await http.post("/companyMaster_Save", data);
    console.log("res",response);
    return response.data;
    //return await (await http.post("/companyMaster_Save", data)).data;
  }
)