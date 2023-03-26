import { createSlice } from "@reduxjs/toolkit";
import sliceMethod from "./actionMethod/sliceMethod";
import IstateMaster from "../../interfaces/stateMaster/IstateMaster";
import IReducerFiled from "../../interfaces/IreducerField";
import { stateMaster_GetAll } from "../../api/stateMasterApi";
import { fDate } from "../../common/util/formatDate";

const initialObj: IstateMaster = {
    Id: 0,
    shortName: "",
    stateName: "",
    countryId: 0,
    longitude: "",
    latitude: ""
}

interface IstateMasterSlice extends IReducerFiled {
    items: IstateMaster[],
    item: IstateMaster
}

const initialState: IstateMasterSlice = {
    isError: false,
    isSuccess: false,
    message: "",
    items: [],
    item: initialObj,
    loading: false
}

const stateMasterSlice=createSlice({
    name:'state',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        // GetAll
        builder.addCase(stateMaster_GetAll.pending, (state, action) => {
            sliceMethod.slicePending(state)
          }).addCase(stateMaster_GetAll.fulfilled, (state, action) => {
            sliceMethod.sliceFulfilled(state, action.payload);
            state.items = action.payload.data;
            state.item=initialObj;
          }).addCase(stateMaster_GetAll.rejected, (state, action) => {
            sliceMethod.sliceRejected(state, action);
          })
    }
})

export default stateMasterSlice.reducer;