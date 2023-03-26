import { createSlice } from "@reduxjs/toolkit";
import sliceMethod from "./actionMethod/sliceMethod";
import Icompany from "../../interfaces/company/Icompany";
import IReducerFiled from "../../interfaces/IreducerField";
import { companyMaster_GetAll, companyMaster_Save } from "../../api/companyMasterApi";
import { fDate } from "../../common/util/formatDate";

const initialObj: Icompany = {
  Id: 0,
  shortName: "",
  companyName: "",
  companyAddress: "",
  stateId: 0,
  cityName: "",
  pinCode: 0,
  gstNumber: "",
  cstNumber: "",
  tinNumber: "",
  panNumber: "",
  fssaiNumber: "",
  mobileNumber: 0,
  emailAddress: ""
}

interface IcompanyMasterSlice extends IReducerFiled {
  items: Icompany[],
  item: Icompany
}

const initialState: IcompanyMasterSlice = {
  isError: false,
  isSuccess: false,
  message: "",
  items: [],
  item: initialObj,
  loading: false
}

const companyMasterSlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    resetCompany: (state) => {
      state.isError = false;
      state.message = "";
      state.isSuccess = false;
    }
  },
  extraReducers: (builder) => {
    // GetAll
    builder.addCase(companyMaster_GetAll.pending, (state, action) => {
      sliceMethod.slicePending(state)
    }).addCase(companyMaster_GetAll.fulfilled, (state, action) => {
      sliceMethod.sliceFulfilled(state, action.payload);
      state.items = action.payload.data;
      state.item = initialObj;
    }).addCase(companyMaster_GetAll.rejected, (state, action) => {
      sliceMethod.sliceRejected(state, action);
    })

    //Save
    builder.addCase(companyMaster_Save.pending, (state, action) => {
      sliceMethod.slicePending(state)
    }).addCase(companyMaster_Save.fulfilled, (state, action) => {
      sliceMethod.sliceFulfilled(state, action.payload);
      //sliceMethod.sliceSuccess(state, "Successfully created new company");
      state.item = (action.payload.data != undefined) ? action.payload.data : initialObj;

    }).addCase(companyMaster_Save.rejected, (state, action) => {
      sliceMethod.sliceRejected(state, action);
    })
  }
})

export default companyMasterSlice.reducer;
export const { resetCompany } = companyMasterSlice.actions;