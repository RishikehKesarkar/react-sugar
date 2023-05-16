import { combineReducers } from "redux";
import authSlice from "./reducer/authSlice";
import stateMasterSlice from "./reducer/stateMasterSlice";
import loginUserSlice from "./reducer/loginUserSlice";
import testSlice from "./reducer/testSlice";
import companyMasterSlice from "./reducer/companyMasterSlice";
import pagesSlice from "./reducer/pagesSlice";
import roleMasterSlice from "./reducer/roleMasterSlice";
import cityMasterSlice from "./reducer/cityMasterSlice";

const reducer=combineReducers({
    auth:authSlice,
    state:stateMasterSlice,
    loginUser:loginUserSlice,
    companyMaster:companyMasterSlice,
    pages:pagesSlice,
    roleMaster:roleMasterSlice,
    test:testSlice,
    City:cityMasterSlice
});

export default reducer;