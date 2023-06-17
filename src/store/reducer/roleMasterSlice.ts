import { createSlice } from "@reduxjs/toolkit";
import { Emessages, sliceEnum } from "../../common/enum/Enum";
import IroleAccess from "../../interface/role/IroleAccess";
import IroleMaster from "../../interface/role/IroleMaster";
import { createNewRole, deleteRole, getAllRoles, getRole, updateRole } from "../../service/roleMaster-Service";
import crypto from "../../common/crypto";
import { getNativeSelectUtilityClasses } from "@mui/material";
import TestAuth from "../../hooks/TestAuth";


const roleAccessInitial: IroleAccess = {
    Id: 0,
    roleId: 0,
    pages: "",
    createdBy: 1,
    updatedBy: 1
}

const roleMasterinitial: IroleMaster = {
    Id: 0,
    roleName: "",
    description: "",
    roleAccess: roleAccessInitial,
    createdBy: 1,
    updatedBy: 1
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
            state.data = roleMasterinitial;
        }).addCase(getAllRoles.rejected, (state, action) => {
            state.status = sliceEnum.error;
            state.httpStatus = action.error.code;
            state.message = action.error.message;
        })

        builder.addCase(getRole.pending, (state) => {
            state.status = sliceEnum.loading;
        }).addCase(getRole.fulfilled, (state, action) => {
            state.data = action.payload;
        }).addCase(getRole.rejected, (state, action) => {
            state.status = sliceEnum.error;
            state.httpStatus = action.error.code;
            state.message = action.error.message;
        })

        builder.addCase(createNewRole.pending, (state) => {
            state.status = sliceEnum.loading;
        }).addCase(createNewRole.fulfilled, (state, action) => {
            state.status = sliceEnum.success;
            state.message = Emessages.success;
        }).addCase(createNewRole.rejected, (state, action) => {
            state.status = sliceEnum.error;
            state.httpStatus = action.error.code;
            state.message = action.error.message;
        })

        builder.addCase(updateRole.pending, (state) => {
            state.status = sliceEnum.loading;
        }).addCase(updateRole.fulfilled, (state, action) => {
            state.status = sliceEnum.success;
            state.message = Emessages.update;
        }).addCase(updateRole.rejected, (state, action) => {
            state.status = sliceEnum.error;
            state.httpStatus = action.error.code;
            state.message = action.error.message;
        })

        builder.addCase(deleteRole.pending, (state) => {
            state.status = sliceEnum.loading;
        }).addCase(deleteRole.fulfilled, (state, action) => {
            state.status = sliceEnum.success;
            state.message = Emessages.delete;
        }).addCase(deleteRole.rejected, (state, action) => {
            state.status = sliceEnum.error;
            state.httpStatus = action.error.code;
            state.message = action.error.message;
        })
    },
})

export const { initialroleState } = roleMasterSlice.actions;
export default roleMasterSlice.reducer;