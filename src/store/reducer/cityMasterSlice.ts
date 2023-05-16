import { createSlice } from "@reduxjs/toolkit";
import IcityMaster from "../../interface/cityMaster/IcityMaster";
import { Emessages, sliceEnum } from "../../common/enum/Enum";
import { createNewCity, getAllCities, getCity, updateCity } from "../../service/cityMaster-Service";

const initialVal: IcityMaster = {
    cityId: 0,
    cityName: "",
    stateId: 0,
    pinCode: 0,
    subArea: ""
}

const initialState = {
    city: initialVal,
    cities: [] as IcityMaster[],
    message: '' as any,
    status: 0 as sliceEnum.idel | sliceEnum.loading | sliceEnum.success | sliceEnum.error,
    httpStatus: '' as any
}

const cityMasterSlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        initialCities: (state) => {
            state.message = '';
            state.status = sliceEnum.idel;
            state.httpStatus = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCities.pending, (state) => {
            state.status = sliceEnum.loading;
        }).addCase(getAllCities.fulfilled, (state, action) => {
            state.cities = action.payload;
        }).addCase(getAllCities.rejected, (state, action) => {
            state.status = sliceEnum.error;
            state.httpStatus = action.error.code;
            state.message = action.error.message;
        })

        builder.addCase(getCity.pending, (state) => {
            state.status = sliceEnum.loading;
        }).addCase(getCity.fulfilled, (state, action) => {
            state.city = action.payload;
        }).addCase(getCity.rejected, (state, action) => {
            state.status = sliceEnum.error;
            state.httpStatus = action.error.code;
            state.message = action.error.message;
        })

        builder.addCase(createNewCity.pending, (state) => {
            state.status = sliceEnum.loading;
        }).addCase(createNewCity.fulfilled, (state, action) => {
            state.status = sliceEnum.success;
            state.message = Emessages.success;
        }).addCase(createNewCity.rejected, (state, action) => {
            state.status = sliceEnum.error;
            state.httpStatus = action.error.code;
            state.message = action.error.message;
        })

        builder.addCase(updateCity.pending, (state) => {
            state.status = sliceEnum.loading;
        }).addCase(updateCity.fulfilled, (state, action) => {
            state.status = sliceEnum.success;
            state.message = Emessages.success;
            state.city = initialVal;
        }).addCase(updateCity.rejected, (state, action) => {
            state.status = sliceEnum.error;
            state.httpStatus = action.error.code;
            state.message = action.error.message;
        })
    }
})

export const { initialCities } = cityMasterSlice.actions;
export default cityMasterSlice.reducer;