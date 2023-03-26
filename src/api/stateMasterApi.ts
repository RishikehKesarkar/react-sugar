import http from "../common/util/http-common";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const stateMaster_GetAll = createAsyncThunk('state/getAll',
  async () => {
    return await (await http.get("/stateMaster_GetAll")).data;
  }
)