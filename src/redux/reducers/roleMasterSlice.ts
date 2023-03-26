import { createSlice } from "@reduxjs/toolkit";
import sliceMethod from "./actionMethod/sliceMethod";
import IroleMaster from "../../interfaces/role/IroleMaster";
import IReducerFiled from "../../interfaces/IreducerField";
import { roleMaster_GetAll,roleMaster_GetById } from "../../api/roleMasterApi";
import IroleAccess from "../../interfaces/role/IroleAccess";

const roleAccessInitial:IroleAccess={
Id:0,
roleId:0,
roleAccess:""
}

const initialObj: IroleMaster = {
    Id: 0,
    roleName: "",
    description: "",
    roleAccess:roleAccessInitial
}

interface IroleMasterSlice extends IReducerFiled {
    items: IroleMaster[],
    item: IroleMaster
}

const initialState: IroleMasterSlice = {
    isError: false,
    isSuccess: false,
    message: "",
    items: [],
    item: initialObj,
    loading: false
}

const roleMasterSlice = createSlice({
    name: 'roleMaster',
    initialState,
    reducers: {
        resetRole: (state) => {
            state.isError = false;
            state.message = "";
            state.isSuccess = false;
        }
    },
    extraReducers: (builder) => {
        // GetAll
        builder.addCase(roleMaster_GetAll.pending, (state, action) => {
            sliceMethod.slicePending(state)
        }).addCase(roleMaster_GetAll.fulfilled, (state, action) => {
            sliceMethod.sliceFulfilled(state, action.payload);
            state.items = action.payload.data;
            state.item = initialObj;
        }).addCase(roleMaster_GetAll.rejected, (state, action) => {
            sliceMethod.sliceRejected(state, action);
        })

        // GetById
        builder.addCase(roleMaster_GetById.pending, (state, action) => {
            sliceMethod.slicePending(state)
        }).addCase(roleMaster_GetById.fulfilled, (state, action) => {
            sliceMethod.sliceFulfilled(state, action.payload);
            state.item = (action.payload.data != undefined) ? action.payload.data : initialObj;
        }).addCase(roleMaster_GetById.rejected, (state, action) => {
            sliceMethod.sliceRejected(state, action);
        })
    }
})

export default roleMasterSlice.reducer;
export const { resetRole } = roleMasterSlice.actions;