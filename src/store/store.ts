import { configureStore } from "@reduxjs/toolkit";
import mapSlice from "./slices/mapSlice";
import { baseApi } from "./Apis/baseApi";

export const store = configureStore({
  reducer: {
    map: mapSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
