import { createSlice } from "@reduxjs/toolkit";
import { sliceEnum } from "../../common/enum/Enum";
import IitemMaster from "../../interface/item/IitemMaster";
import { getAllitem } from "../../service/itemMaster-Service";

const initialValue: IitemMaster = {
    itemId: 0,
    itemType: 0,
    itemName: "",
    rate: 0,
    purchaseAc: 0,
    saleAc: 0,
    vatAc: 0,
    openingBal: 0,
    kgPerKatta: 0,
    minRate: 0,
    maxRate: 0,
    companyCode: 0,
    branchCode: 0,
    hsn: "",
    openingValue: 0,
    gstCode: 0,
    markaSet: 0,
    supercost: 0,
    packing: 0,
    lodingGst: 0,
    markaPerc: 0,
    superPerc: 0,
    ratePer: 0,
    isService: 0
}

const initialState = {
    item: initialValue,
    items: [] as IitemMaster[],
    message: '',
    status: sliceEnum.idle,
    httpStatus: ''
}
const updateStatus = (state: any, action: any) => {
    state.status = action.meta.requestStatus == 'pending' ? sliceEnum.loading : sliceEnum.error;
    state.httpStatus = action.error ? action.error.code : null;
    state.message = action.error ? action.error.message : null;
    if (action.meta.requestStatus == 'rejected')
        state.gst = initialValue;
};

const itemMasterSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        initialItemState: (state) => {
            state.message = '';
            state.status = sliceEnum.idle;
            state.httpStatus = '';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllitem.pending, updateStatus)
            .addCase(getAllitem.fulfilled, (state, action) => {
                state.items = action.payload;
                state.item = initialValue;
            })
            .addCase(getAllitem.rejected, updateStatus)
    }
})

export const { initialItemState } = itemMasterSlice.actions;
export default itemMasterSlice.reducer;