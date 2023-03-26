import { createSlice } from "@reduxjs/toolkit";
import sliceMethod from "./actionMethod/sliceMethod";
import IsignIn from "../../interfaces/auth/IsignIn";
import IReducerFiled from "../../interfaces/IreducerField";
import { signIn, signUp } from "../../api/signInUpApi";
import { fDate } from "../../common/util/formatDate";
import IsignUp from "../../interfaces/auth/IsignUp";

const initialObj: IsignUp = {
  Id: 0,
  fullName: "",
  stateId: 0,
  cityName: "",
  emailAddress: "",
  mobileNumber: 0,
  companyId: 0,
  roleId: 0,
  userName: "",
  password: ""
}
interface IsignUpSlice extends IReducerFiled {
  items: IsignUp[],
  item: IsignUp
}

const initialState: IsignUpSlice = {
  isError: false,
  isSuccess: false,
  message: "",
  items: [],
  item: initialObj,
  loading: false
}

const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    resetSignIn: (state) => {
      state.isError = false;
      state.message = "";
      state.isSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state, action) => {
      sliceMethod.slicePending(state);
    }).addCase(signIn.fulfilled, (state, action) => {
      sliceMethod.sliceFulfilled(state, action.payload);
      state.item = action.payload.data;
    }).addCase(signIn.rejected, (state, action) => {
      sliceMethod.sliceRejected(state, action);
    })
    // Sign Up
    builder.addCase(signUp.pending, (state, action) => {
      sliceMethod.slicePending(state);
    }).addCase(signUp.fulfilled, (state, action) => {
      sliceMethod.sliceFulfilled(state, action.payload);
      //sliceMethod.sliceSuccess(state, "Successfully Register");
      state.item = (action.payload.data != undefined) ? action.payload.data : initialObj;

    }).addCase(signUp.rejected, (state, action) => {
      sliceMethod.sliceRejected(state, action);
    })

  }
})

export default signInSlice.reducer;
export const { resetSignIn } = signInSlice.actions;
