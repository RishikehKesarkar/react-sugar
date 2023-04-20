import { createSlice } from "@reduxjs/toolkit";
import { pageInterface } from "../../Routes/pages";
import { getAllpages } from "../../service/pageService";
import { sliceEnum } from "../../common/enum/Enum";

const initialState = {
    dataArr: [] as pageInterface[],
    message: '' as any,
    status: 0 as sliceEnum.idel | sliceEnum.loading | sliceEnum.success | sliceEnum.error,
    httpStatus: '' as any,
}

const pagesSlice = createSlice({
    name: 'pages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllpages.pending, (state) => {
            state.status = sliceEnum.loading;
        }).addCase(getAllpages.fulfilled, (state, action) => {
            action.payload.map((item: any) => {
                item.hidden = item.hidden == 1 ? true : false
            })
            state.dataArr = action.payload;
            state.status = sliceEnum.success;
        })
    }
})

export default pagesSlice.reducer;