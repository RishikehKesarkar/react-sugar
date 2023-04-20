import { createSlice } from "@reduxjs/toolkit";
import { signInExtraReducer } from "../../service/authService";
import IsignUp from "../../interface/auth/IsignUp";
import { sliceEnum } from "../../common/enum/Enum";
import store from "../store";
import { setLoginUserDetails } from "./loginUserSlice";

const initialState = {
    data: { user: '', roles: '', accessToken: '' },
    message: '',
    status: 0 as sliceEnum.idel | sliceEnum.loading | sliceEnum.success | sliceEnum.error

}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        initialAuth: (state, action) => {
            state.status = sliceEnum.idel;
            state.message = '';
            if (action.payload == "clear")
                state.data = { user: '', roles: '', accessToken: '' };
        },
        loadingAuth: (state) => {
            state.status = sliceEnum.loading;
        },
        setAuth: (state, action) => {
            state.data = {
                user: action.payload.userName, roles: action.payload.roleAccess,
                accessToken: action.payload.accessToken
            };
            state.status = sliceEnum.success;
        },
        errorAuth: (state, action) => {
            state.status = sliceEnum.error;

        }
    },
    extraReducers: (builder) => {
        builder.addCase(signInExtraReducer.pending, (state, action) => {
            state.status = sliceEnum.loading;
        }).addCase(signInExtraReducer.fulfilled, (state, action) => {
            state.status = sliceEnum.success;
            state.data = {
                user: action.payload.userName, roles: action.payload.roleAccess,
                accessToken: action.payload.accessToken
            };
        }).addCase(signInExtraReducer.rejected, (state, action) => {
            state.status = sliceEnum.error;
        })
    }
})

export const { initialAuth, loadingAuth, setAuth, errorAuth } = authSlice.actions;
export default authSlice.reducer;