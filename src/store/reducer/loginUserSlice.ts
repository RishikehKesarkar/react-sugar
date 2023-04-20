import { createSlice } from "@reduxjs/toolkit";
import IsignUp from "../../interface/auth/IsignUp";
import { sign } from "crypto";
import store from "../store";

const initialState = {
    data: {} as IsignUp,
    status: '' as 'idel' |'success' |'loading'|'error'
}

const loginUserSlice = createSlice({
    name: 'loginUser',
    initialState,
    reducers: {
        setLoginUserDetails: (state,action) => {
            state.data=action.payload;
        }
    }
})

const resetAuth = () => {
    setTimeout(() => {
//   store.dispatch(initialAuth());
    }, 3000);
}

export const { setLoginUserDetails } = loginUserSlice.actions;
export default loginUserSlice.reducer;