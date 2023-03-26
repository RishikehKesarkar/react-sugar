import http from "../common/util/http-common";
import { createAsyncThunk } from "@reduxjs/toolkit";
import IsignUp from "../interfaces/auth/IsignUp";

export const signIn = createAsyncThunk('signIn/validate',
  async (data: any) => {
    const response = await http.get(`/signIn/${data.user}/${data.password}`);
    return (await response.data);
  }
)

//-----------------------------------------------------------------------------------------------

// Sign Up

export const signUp = createAsyncThunk('signUp/Post',
  async (data: IsignUp) => {
    return await (await http.post('/signUp', data)).data;
  }
)

