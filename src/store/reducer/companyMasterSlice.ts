import { createSlice } from "@reduxjs/toolkit";
import IcompanyMaster from "../../interface/company/Icompany";
import { Emessages, sliceEnum } from "../../common/enum/Enum";
import { createNewCompany, getAllCompanys, getCompany, updateCompany } from "../../service/companyMaster-Service";
import { getSessionUser } from "../../common/commonMethod";

// const userInfo = (sessionStorage.getItem("uinfo")) ? JSON.parse(crypto.decrypted(sessionStorage.getItem("uinfo"))) : null;
const initialValue: IcompanyMaster = {
    Id: 0,
    shortName: "",
    companyName: "",
    companyAddress: "",
    optionalAddress: "",
    stateId: 0,
    cityName: "",
    pinCode: 0,
    gstNumber: "",
    cstNumber: "",
    tinNumber: "",
    panNumber: "",
    fssaiNumber: "",
    mobileNumber: 0,
    emailAddress: "",
    createdBy: getSessionUser()?.userId || 0,
    updatedBy: getSessionUser()?.userId || 0
}

const initialState = {
    data: initialValue,
    dataArr: [] as IcompanyMaster[],
    message: '' as any,
    status: 0 as sliceEnum.idle | sliceEnum.loading | sliceEnum.success | sliceEnum.error,
    httpStatus: '' as any,
}

const companyMasterSlice = createSlice({
    name: 'companyMaster',
    initialState,
    reducers: {
        initialcompanyState: (state) => {
            state.message = '';
            state.status = sliceEnum.idle;
            state.httpStatus = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createNewCompany.pending, (state) => {
            state.status = sliceEnum.loading;
        }).addCase(createNewCompany.fulfilled, (state, action) => {
            state.status = sliceEnum.success;
            state.message = Emessages.success;
        }).addCase(createNewCompany.rejected, (state, action) => {
            state.status = sliceEnum.error;
            state.httpStatus = action.error.code;
            state.message = action.error.message;
        })

        builder.addCase(updateCompany.pending, (state) => {
            state.status = sliceEnum.loading;
        }).addCase(updateCompany.fulfilled, (state, action) => {
            state.status = sliceEnum.success;
            state.message = Emessages.update;
        }).addCase(updateCompany.rejected, (state, action) => {
            state.status = sliceEnum.error;
            state.httpStatus = action.error.code;
            state.message = action.error.message;
        })

        builder.addCase(getAllCompanys.pending, (state) => {
            state.status = sliceEnum.loading;
        }).addCase(getAllCompanys.fulfilled, (state, action) => {
            state.dataArr = action.payload;
        }).addCase(getAllCompanys.rejected, (state, action) => {
            state.status = sliceEnum.error;
            state.httpStatus = action.error.code;
            state.message = action.error.message;
        })

        builder.addCase(getCompany.pending, (state) => {
            state.status = sliceEnum.loading;
        }).addCase(getCompany.fulfilled, (state, action) => {
            state.data = action.payload;
        }).addCase(getCompany.rejected, (state, action) => {
            state.status = sliceEnum.error;
            state.httpStatus = action.error.code;
            state.message = action.error.message;
        })
    },
})

export const { initialcompanyState } = companyMasterSlice.actions;
export default companyMasterSlice.reducer;