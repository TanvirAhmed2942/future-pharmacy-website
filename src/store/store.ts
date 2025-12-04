import { configureStore } from "@reduxjs/toolkit";
import mapSlice from "./slices/mapSlice";
import userSlice from "./slices/userSlice/userSlice";
import { baseApi } from "./Apis/baseApi";

// Create store (works on both server and client)
export const store = configureStore({
  reducer: {
    map: mapSlice,
    user: userSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
