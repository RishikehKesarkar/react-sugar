import { createSlice } from "@reduxjs/toolkit";
import { sliceEnum } from "../../common/enum/Enum";
import IgstMaster from "../../interface/gst/IgstMaster";
import { getAllgst, getGst } from "../../service/gstMaster-Service";

const initialVal: IgstMaster = {
    Id: 0,
    name: "",
    rate: 0,
    igst: 0,
    sgst: 0,
    cgst: 0,
    yearCode: 0
}

const initialState = {
    gst: initialVal,
    gsties: [] as IgstMaster[],
    message: '',
    status: sliceEnum.idle,
    httpStatus: ''
}
const updateStatus = (state: any, action: any) => {
    state.status = action.meta.requestStatus == 'pending' ? sliceEnum.loading : sliceEnum.error;
    state.httpStatus = action.error ? action.error.code : null;
    state.message = action.error ? action.error.message : null;
    if (action.meta.requestStatus == 'rejected')
        state.gst = initialVal;
};

const gstMasterSlice = createSlice({
    name: 'gst',
    initialState,
    reducers: {
        initialGstState: (state) => {
            state.message = '';
            state.status = sliceEnum.idle;
            state.httpStatus = '';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllgst.pending, updateStatus)
            .addCase(getAllgst.fulfilled, (state, action) => {
                state.gsties = action.payload;
                state.gst = initialVal;
            })
            .addCase(getAllgst.rejected, updateStatus)
            .addCase(getGst.pending, updateStatus)
            .addCase(getGst.fulfilled, (state, action) => {
                state.gst = action.payload;
            })
            .addCase(getGst.rejected, updateStatus)
    }
})

export const { initialGstState } = gstMasterSlice.actions;
export default gstMasterSlice.reducer;