import { setCookies } from "../../../common/util/cookies";

const slicePending = async (state: any) => {
    state.loading = true;
    setCookies('loader',true);
    state.isError = false;
    state.isSuccess = false;
    state.message = "";
}

const sliceFulfilled = async (state: any, action: any, item = "", message?: string) => {
    state.loading = false;
    setCookies('loader',false);
    state.isSuccess = action.isSuccess;
    state.isError = action.isError;
    state.message = message == undefined ? action.message : message;

}

const sliceRejected = async (state: any, action: any) => {
    state.loading = false;
        setCookies('loader',false);
        state.isError = true;
        state.message = action.error.message;

}

const sliceSuccess = (state: any, msg: string) => {
    state.isSuccess = true;
    state.message = state.message == "" ? msg : state.message;
}


const sliceMethod = { slicePending, sliceFulfilled, sliceRejected, sliceSuccess }

export default sliceMethod;