import { combineReducers } from "redux";
import signInSlice from "./signInSlice";
import stateMasterSlice from "./stateMasterSlice";
import companyMasterSlice from "./companyMasterSlice";
import roleMasterSlice from "./roleMasterSlice";

const reducer = combineReducers({
   signIn:signInSlice,
   state:stateMasterSlice,
   company:companyMasterSlice,
   role:roleMasterSlice
  });

  export default reducer;