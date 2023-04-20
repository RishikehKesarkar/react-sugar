import { createSlice } from "@reduxjs/toolkit";
import { sliceEnum } from "../../common/enum/Enum";
import store from "../store";

const initialState = {
    data: { user: '', roles: '', accessToken: '' },
    message: '',
    status: 0 as sliceEnum.idel | sliceEnum.loading | sliceEnum.success | sliceEnum.error

}
const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        setTest: (state) => {
            state.data = { user: 'A', roles: '1,2', accessToken: 'asdfgui98765' };
            state.status = 2;
        }
    }
})

export const { setTest } = testSlice.actions;

export default testSlice.reducer;