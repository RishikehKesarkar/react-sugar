import { createSlice } from "@reduxjs/toolkit";
import { Emessages, sliceEnum } from "../../common/enum/Enum";
import IroleAccess from "../../interface/role/IroleAccess";
import IroleMaster from "../../interface/role/IroleMaster";
import { getAllRoles, getRole } from "../../service/roleMaster-Service";

const roleAccessInitial: IroleAccess = {
    Id: 0,
    roleId: 0,
    roleAccess: ""
}

const roleMasterinitial: IroleMaster = {
    Id: 0,
    roleName: "",
    description: "",
    roleAccess: roleAccessInitial,
}

const initialState = {
    data: roleMasterinitial,
    dataArr: [] as IroleMaster[],
    message: '' as any,
    status: 0 as sliceEnum.idel | sliceEnum.loading | sliceEnum.success | sliceEnum.error,
    httpStatus: '' as any,
}

const roleMasterSlice = createSlice({
    name: 'roleMaster',
    initialState,
    reducers: {
        initialroleState: (state) => {
            state.message = '';
            state.status = sliceEnum.idel;
            state.httpStatus = '';
        }
    },
    extraReducers(builder) {
        builder.addCase(getAllRoles.pending, (state) => {
            state.status = sliceEnum.loading;
        }).addCase(getAllRoles.fulfilled, (state, action) => {
            state.dataArr = action.payload;
            state.status = sliceEnum.success;
        }).addCase(getAllRoles.rejected, (state, action) => {
            state.status = sliceEnum.error;
            state.httpStatus = action.error.code;
            state.message = action.error.message;
        })

        builder.addCase(getRole.pending, (state) => {
            state.status = sliceEnum.loading;
        }).addCase(getRole.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = sliceEnum.success;
        }).addCase(getRole.rejected, (state, action) => {
            state.status = sliceEnum.error;
            state.httpStatus = action.error.code;
            state.message = action.error.message;
        })
    },
})

export const { initialroleState } = roleMasterSlice.actions;
export default roleMasterSlice.reducer;