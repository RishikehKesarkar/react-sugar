import { createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { errorAuth, initialAuth, loadingAuth, setAuth } from "../store/reducer/authSlice";
import { setLoginUserDetails } from "../store/reducer/loginUserSlice";

export const signInExtraReducer = createAsyncThunk('auth/signIn',
  async (data: any) => {
    return await (await axios.post('/auth', data)).data
  }
)

export const signIn = (data: any) => {
  return async (dispatch: any) => {
    dispatch(loadingAuth());
    try {
      const response = await (await axios.post('/auth', data)).data;
      dispatch(setAuth(response));
      dispatch(setLoginUserDetails(response));
    }
    catch (err) {
      dispatch(errorAuth(error(err)));
    }
    finally {
      setTimeout(() => { dispatch(initialAuth(null)) }, 3000)
    }
  }
}

export const refresh = () => {
  return async (dispatch: any) => {
    dispatch(loadingAuth());
    try {
      const response = await (await axios.get('/refresh', {
        withCredentials: true
      })).data;
      //dispatch(setAuth(response));
      dispatch(setAuth(response));
      dispatch(setLoginUserDetails(response));
    }
    catch (err: any) {
      dispatch(errorAuth(err.response));
    }
    finally {
      setTimeout(() => { dispatch(initialAuth(null)) }, 3000)
    }
  }
}

const error = (err: any) => {
  return {
    code: err.response.status.toString(),
    name: "Custom",
    message: err.response.data.message,
  }
}