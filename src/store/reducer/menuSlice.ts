import { createSlice } from "@reduxjs/toolkit";
import { sliceEnum } from "../../common/enum/Enum";
import { getAllMenu } from "../../service/menuMaster-Service";

interface ImenuMaster {
    menuId: number,
    fMenuId: number | null,
    menuName: string,
    subMenu: ImenuMaster[],
    path: string,
    icon: string,
}

const initialState = {
    menus: [] as ImenuMaster[],
    sideMenus: [] as ImenuMaster[],
    message: '' as any,
    status: 0 as sliceEnum.idle | sliceEnum.loading | sliceEnum.success | sliceEnum.error,
    httpStatus: '' as any,
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllMenu.pending, (state) => {
            state.status = sliceEnum.loading;
        }).addCase(getAllMenu.fulfilled, (state, action) => {
            state.menus = action.payload.menus;
            state.sideMenus = action.payload.sideMenus;
            state.status = sliceEnum.success;
        })
    }
})

export default menuSlice.reducer;