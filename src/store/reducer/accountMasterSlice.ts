import { createSlice } from "@reduxjs/toolkit";
import { Emessages, sliceEnum } from "../../common/enum/Enum";
import IaccountDetail from "../../interface/account/IaccountDetail";
import { createNewAccount, getAccount, getAccountDetail, getAllAccounts, updateAccount } from "../../service/accountMaster-Service";
import Iaccount from "../../interface/account/Iaccount";
import { getSessionUser } from "../../common/commonMethod";
import { fDate } from "../../common/formatDate";

const initialValue: Iaccount = {
    accountId: 0,
    shortName: "",
    accountName: "",
    acType: 'P',
    acRate: 0,
    accountAddress: "",
    cityId: 0,
    pinCode: "",
    localLicNo: "",
    tinNo: "",
    cstNo: "",
    gstNo: "",
    emailId: "",
    emailIdCC: "",
    otherNarration: "",
    eccNo: "",
    bankName: "",
    bankAcNo: "",
    bankOpening: 0,
    bankOpDrcr: 'd',
    openingBalance: 0,
    drcr: 'd',
    groupCode: 0,
    commission: 0,
    carporateParty: "",
    referBy: "",
    offPhone: "",
    fax: "",
    companyPan: "",
    acPan: "",
    mobileNo: "",
    isLogin: "",
    ifsc: "",
    fssai: "",
    branch1OB: 0,
    branch2OB: 0,
    branch1Drcr: "",
    branch2Drcr: "",
    locked: 0,
    stateId: 0,
    unregisterGST: 0,
    distance: 0,
    balLimit: 0,
    whatsUpNo: "",
    companyCode: 0,
    adharNo: "",
    limitBy: 0,
    tanNo: "",
    tdsApplicable: 0,
    panLink: "",
    insurance: 0,
    msOms: "",
    loadingbyus: "",
    accountContactDetail: [] as IaccountDetail[],
    createdBy: getSessionUser()?.userId || 0,
    updatedBy: getSessionUser()?.userId || 0,
    createdDate: fDate(),
    updatedDate: fDate()
}
const accountDetailInitial: IaccountDetail = {
    Id: 0,
    accId: 0,
    name: "",
    mobileNo: "",
    email: "",
    panNo: "",
    other: "",
    detailAction: "N"
}

const initialState = {
    account: initialValue,
    accountContactDetail: accountDetailInitial,
    accounts: [] as Iaccount[],
    message: '' as any,
    status: 0 as sliceEnum.idle | sliceEnum.loading | sliceEnum.success | sliceEnum.error,
    httpStatus: '' as any,
}
const updateStatus = (state: any, action: any) => {
    state.status = action.meta.requestStatus == 'pending' ? sliceEnum.loading : sliceEnum.error;
    state.httpStatus = action.error ? action.error.code : null;
    state.message = action.error ? action.error.message : null;
};
const accountMasterSlice = createSlice({
    name: 'accountMaster',
    initialState,
    reducers: {
        initialaccountState: (state) => {
            state.message = '';
            state.status = sliceEnum.idle;
            state.httpStatus = '';
        },
        setaccountDetail: (state, action) => {
            state.accountContactDetail = action.payload != null ? action.payload : accountDetailInitial;
        },
        setaccountDetails: (state, action) => {
            state.account.accountContactDetail = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAccount.pending, updateStatus)   // get account
            .addCase(getAccount.fulfilled, (state, action) => {
                state.account = action.payload;
            })
            .addCase(getAccount.rejected, updateStatus)
            .addCase(getAccountDetail.pending, updateStatus)   // get accountDetail
            .addCase(getAccountDetail.fulfilled, (state, action) => {
                state.accountContactDetail = action.payload;
            })
            .addCase(getAccountDetail.rejected, updateStatus)
            .addCase(getAllAccounts.pending, updateStatus)    // get All
            .addCase(getAllAccounts.fulfilled, (state, action) => {
                state.accounts = action.payload;
                state.account = initialValue;
            })
            .addCase(getAllAccounts.rejected, updateStatus)
            .addCase(createNewAccount.pending, updateStatus)  // create New
            .addCase(createNewAccount.fulfilled, (state, action) => {
                state.status = sliceEnum.success;
                state.message = Emessages.success;
            })
            .addCase(createNewAccount.rejected, updateStatus)
            .addCase(updateAccount.pending, updateStatus)
            .addCase(updateAccount.fulfilled, (state, action) => {
                state.status = sliceEnum.success;
                state.message = Emessages.update;
                state.account = initialValue;
            })
            .addCase(updateAccount.rejected, updateStatus);
    }
})
export const { initialaccountState, setaccountDetail, setaccountDetails } = accountMasterSlice.actions;
export default accountMasterSlice.reducer;
