import { createSlice } from "@reduxjs/toolkit";
import { IpageMaster } from "../../interface/Ipage/IpageMaster";
import { createNewPage, getAllpages, getPage, updatePage } from "../../service/pageService";
import { Emessages, ERouteType, sliceEnum } from "../../common/enum/Enum";

const initialVal: IpageMaster = {
    Id: 0,
    path: "",
    title: "",
    routeType: Number(ERouteType.public),
    pageName: 'Select',
    hidden: 0,
    menuId: 0,
    subMenuId: 0
}

const initialState = {
    page: initialVal,
    pages: [] as IpageMaster[],
    message: '' as any,
    status: 0 as sliceEnum.idle | sliceEnum.loading | sliceEnum.success | sliceEnum.error,
    httpStatus: '' as any,
}

const pagesSlice = createSlice({
    name: 'pages',
    initialState,
    reducers: {
        initialPage: (state) => {
            state.status = sliceEnum.idle;
            state.message = '';
            state.httpStatus = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllpages.pending, (state) => {
            state.status = sliceEnum.loading;
        }).addCase(getAllpages.fulfilled, (state, action) => {
            action.payload.map((item: any) => {
                item.hidden = item.hidden == 1 ? true : false
            })
            state.pages = action.payload;
            state.status = sliceEnum.success;
        }).addCase(getAllpages.rejected, (state, action) => {
            state.status = sliceEnum.error;
            state.httpStatus = action.error.code;
            state.message = action.error.message;
        })

        builder.addCase(getPage.pending, (state) => {
            state.status = sliceEnum.loading;
        }).addCase(getPage.fulfilled, (state, action) => {
            if (action.payload)
                state.page = action.payload;
            else
                state.page = initialVal;
        }).addCase(getPage.rejected, (state, action) => {
            state.status = sliceEnum.error;
            state.httpStatus = action.error.code;
            state.message = action.error.message;
        })

        builder.addCase(createNewPage.pending, (state) => {
            state.status = sliceEnum.loading;
        }).addCase(createNewPage.fulfilled, (state, action) => {
            state.status = sliceEnum.success;
            state.message = Emessages.success;
        }).addCase(createNewPage.rejected, (state, action) => {
            state.status = sliceEnum.error;
            state.httpStatus = action.error.code;
            state.message = action.error.message;
        })
        
        builder.addCase(updatePage.pending, (state) => {
            state.status = sliceEnum.loading;
        }).addCase(updatePage.fulfilled, (state, action) => {
            state.status = sliceEnum.success;
            state.message = Emessages.update;
        }).addCase(updatePage.rejected, (state, action) => {
            state.status = sliceEnum.error;
            state.httpStatus = action.error.code;
            state.message = action.error.message;
        })
        // builder.addCase(updatePage.pending, (state) => {
        //     state.status = sliceEnum.loading;
        // }).addCase(updatePage.fulfilled, (state, action) => {
        //     state.status = sliceEnum.success;
        //     state.message = Emessages.update;
        // }).addCase(createNewPage.rejected, (state, action) => {
        //     state.status = sliceEnum.error;
        //     state.httpStatus = action.error.code;
        //     state.message = action.error.message;
        // })
    }
})
export const { initialPage } = pagesSlice.actions;
export default pagesSlice.reducer;