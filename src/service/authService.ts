import { createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { errorAuth, initialAuth, loadingAuth, setAuth } from "../store/reducer/authSlice";
import { setLoginUserDetails } from "../store/reducer/loginUserSlice";

export const signInExtraReducer = createAsyncThunk('auth/signIn',
  async (data: any) => {
    console.log("singDara", data);
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
      dispatch(errorAuth(err));
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
    catch (err) {
      dispatch(errorAuth(err));
    }
    finally {
      setTimeout(() => { dispatch(initialAuth(null)) }, 3000)
    }
  }
}


