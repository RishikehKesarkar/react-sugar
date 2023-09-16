import { createSlice } from "@reduxjs/toolkit";
import { Emessages, EtranType, sliceEnum } from "../../common/enum/Enum";
import { fDate, fDateTime } from "../../common/formatDate";
import Ipurchase from "../../interface/purchase/Ipurchase";
import IpurchaseDetail from "../../interface/purchase/IpurchaseDetail";
import { createNewPurchase, getAllPurchases, getPurchase, updatePurchase } from "../../service/purchase-Service";

const purchaseInitialValue: Ipurchase = {
    purchaseId: 0,
    subTotal: 0,
    purchaseDetail: [] as IpurchaseDetail[],
    tranType: EtranType.PS,
    doNo: 0,
    docDate: fDateTime(),
    retailStock: 0,
    fromId: 0,
    unitId: 0,
    millId: 0,
    fromStation: "",
    toStation: "",
    grade: "",
    lorryNo: "",
    wearhouse: "",
    brokerId: 0,
    gstId: 0,
    billNo: "",
    millInvDate: fDate(),
    lessFrtRate: 0,
    freight: 0,
    cashAdvance: 0,
    bankCommi: 0,
    otherAmount: 0,
    billAmount: 0,
    dueDays: 0,
    netQtl: 0,
    ewayBillNo: "",
    tcsRate: 0,
    tcsAmount: 0,
    netPayable: 0,
    tdsRate: 0,
    tdsAmount: 0,
    companyId: 0,
    yearId: 0,
    cgstAmount: 0,
    igstAmount: 0,
    sgstAmount: 0
}
const detailInitialValue: IpurchaseDetail = {
    Id: 0,
    purchaseId: 0,
    itemAmount: 0,
    tranType: EtranType.PS,
    itemId: 0,
    brandId: 0,
    quantal: 0,
    packing: 0,
    bags: 0,
    rate: 0,
    narration: "",
    companyId: 0,
    yearId: 0,
    detailAction: "N"
}

const initialState = {
    purchase: purchaseInitialValue,
    purchaseDetail: detailInitialValue,
    purchases: [] as Ipurchase[],
    message: '' as any,
    status: 0 as sliceEnum.idle | sliceEnum.loading | sliceEnum.success | sliceEnum.error,
    httpStatus: '' as any,
}

const updateStatus = (state: any, action: any) => {
    state.status = action.meta.requestStatus == 'pending' ? sliceEnum.loading : sliceEnum.error;
    state.httpStatus = action.error ? action.error.code : null;
    state.message = action.error ? action.error.message : null;
};

const purchaseSlice = createSlice({
    name: 'purchase',
    initialState,
    reducers: {
        setpurchase: (state, action) => {
            state.purchase = action.payload;
        },
        setpurchaseDetail: (state, action) => {
            state.purchaseDetail = action.payload != null ? action.payload : detailInitialValue;
        },
        initialPurchaseState: (state) => {
            state.message = '';
            state.status = sliceEnum.idle;
            state.httpStatus = '';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPurchase.pending, updateStatus)
            .addCase(getPurchase.fulfilled, (state, action) => {
                state.purchase = action.payload;
            })
            .addCase(getPurchase.rejected, updateStatus)        // endGet
            .addCase(getAllPurchases.pending, updateStatus)
            .addCase(getAllPurchases.fulfilled, (state, action) => {
                state.purchases = action.payload;
            })
            .addCase(getAllPurchases.rejected, updateStatus)    // endGetAll
            .addCase(createNewPurchase.pending, updateStatus)
            .addCase(createNewPurchase.fulfilled, (state) => {
                state.status = sliceEnum.success;
                state.message = Emessages.success;
            })
            .addCase(createNewPurchase.rejected, updateStatus)  // endCreate
            .addCase(updatePurchase.pending, updateStatus)
            .addCase(updatePurchase.fulfilled, (state) => {
                state.status = sliceEnum.success;
                state.message = Emessages.success;
            })
            .addCase(updatePurchase.rejected, updateStatus)  // endCreate
    }
})
export const { setpurchase, setpurchaseDetail, initialPurchaseState } = purchaseSlice.actions;
export default purchaseSlice.reducer;