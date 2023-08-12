import { createSlice } from "@reduxjs/toolkit";
import IcityMaster from "../../interface/cityMaster/IcityMaster";
import { Emessages, sliceEnum } from "../../common/enum/Enum";
import { createNewCity, getAllCities, getCity, updateCity } from "../../service/cityMaster-Service";

const initialVal: IcityMaster = {
    cityId: 0,
    cityName: "",
    stateId: 0,
    pinCode: 0,
    subArea: "",
};

const initialState = {
    city: initialVal,
    cities: [] as IcityMaster[],
    message: '',
    status: sliceEnum.idle,
    httpStatus: '',
};

const updateStatus = (state: any, action: any) => {
    state.status = action.meta.requestStatus == 'pending' ? sliceEnum.loading : sliceEnum.error;
    state.httpStatus = action.error ? action.error.code : null;
    state.message = action.error ? action.error.message : null;
};

const cityMasterSlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        initialCityState: (state) => {
            state.message = '';
            state.status = sliceEnum.idle;
            state.httpStatus = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCities.pending, updateStatus)
            .addCase(getAllCities.fulfilled, (state, action) => {
                state.cities = action.payload;
                state.city = initialVal;
            })
            .addCase(getAllCities.rejected, updateStatus)
            .addCase(getCity.pending, updateStatus)
            .addCase(getCity.fulfilled, (state, action) => {
                state.city = action.payload;
            })
            .addCase(getCity.rejected, updateStatus)
            .addCase(createNewCity.pending, updateStatus)
            .addCase(createNewCity.fulfilled, (state, action) => {
                state.status = sliceEnum.success;
                state.message = Emessages.success;
            })
            .addCase(createNewCity.rejected, updateStatus)
            .addCase(updateCity.pending, updateStatus)
            .addCase(updateCity.fulfilled, (state, action) => {
                state.status = sliceEnum.success;
                state.message = Emessages.update;
                state.city = initialVal;
            })
            .addCase(updateCity.rejected, updateStatus);
    },
});

export const { initialCityState } = cityMasterSlice.actions;
export default cityMasterSlice.reducer;