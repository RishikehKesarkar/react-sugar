import { configureStore } from "@reduxjs/toolkit";
import reducer from "./index";

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export const { dispatch,getState } = store;
export default store;

export type RootState = ReturnType<typeof reducer>