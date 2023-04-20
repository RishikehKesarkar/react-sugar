import { createSlice } from "@reduxjs/toolkit";
import IstateMaster from "../../interface/stateMaster/IstateMaster";
import { stateMaster_GetAll } from "../../service/stateMasterService";
import { Emessages, sliceEnum } from "../../common/enum/Enum";
import { HttpStatusCode } from "axios";
import { stat } from "fs";
import store from "../store";

const initialval:IstateMaster={
    Id: 0,
    shortName: "",
    stateName: "",
    countryId: 0,
    longitude: "",
    latitude: ""
}

const initialState = {
    data: initialval,
    dataArr: [] as IstateMaster[],
    message: '' as any,
    status: 0 as sliceEnum.idel | sliceEnum.loading | sliceEnum.success | sliceEnum.error,
    httpStatus: '' as any
}

const stateMasterSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {
        initialStates: (state) => {
            state.message = '';
            state.status = sliceEnum.idel;
            state.httpStatus='';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(stateMaster_GetAll.pending, (state) => {
            state.status = sliceEnum.loading;
        }).addCase(stateMaster_GetAll.fulfilled, (state, action) => {
            state.status = sliceEnum.success;
            state.dataArr = action.payload;
            state.message=Emessages.success;
        }).addCase(stateMaster_GetAll.rejected, (state, action) => {
            state.status = sliceEnum.error;
            state.httpStatus = action.error.code;
            state.message = action.error.message;
        })
    }
})

const stateinitial = () => {
    setTimeout(() => { store.dispatch(initialStates()) }, 3000);
}


export const { initialStates } = stateMasterSlice.actions;
export default stateMasterSlice.reducer;