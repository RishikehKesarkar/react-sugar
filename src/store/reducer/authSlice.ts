import { createSlice } from "@reduxjs/toolkit";
import { sliceEnum } from "../../common/enum/Enum";

const initialVal = { userId: 0, user: '', accessToken: '', roleId: 0, roleAccess: '' }
const initialState = {
    data: initialVal,
    message: '',
    status: 0 as sliceEnum.idel | sliceEnum.loading | sliceEnum.success | sliceEnum.error,
    httpStatus: '' as any

}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        initialAuth: (state, action) => {
            state.status = sliceEnum.idel;
            state.message = '';
            state.httpStatus = '';
            if (action.payload == "clear")
                state.data = initialVal;
        },
        loadingAuth: (state) => {
            state.status = sliceEnum.loading;
        },
        setAuth: (state, action) => {
            state.data = {
                userId: action.payload.Id, user: action.payload.userName,
                accessToken: action.payload.accessToken, roleAccess: action.payload.roleAccess,
                roleId: action.payload.roleId

            };
            state.status = sliceEnum.success;
        },
        errorAuth: (state, action) => {
            state.status = sliceEnum.error;
            state.httpStatus = action.payload.status;
            state.message = action.payload.statusText;

        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(signInExtraReducer.pending, (state, action) => {
    //         state.status = sliceEnum.loading;
    //     }).addCase(signInExtraReducer.fulfilled, (state, action) => {
    //         state.status = sliceEnum.success;
    //         state.data = {
    //            userId:0, user: action.payload.userName, roles: action.payload.roleAccess,
    //             accessToken: action.payload.accessToken
    //         };
    //     }).addCase(signInExtraReducer.rejected, (state, action) => {
    //         state.status = sliceEnum.error;
    //     })
    // }
})

export const { initialAuth, loadingAuth, setAuth, errorAuth } = authSlice.actions;
export default authSlice.reducer;