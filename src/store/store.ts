import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import mapSlice from "./slices/mapSlice";
import userSlice from "./slices/userSlice/userSlice";
import checkoutSlice from "./slices/checkoutSlice";
import { baseApi } from "./Apis/baseApi";
// Persist config for checkout slice
const checkoutPersistConfig = {
  key: "checkout",
  storage,
  whitelist: ["checkoutData"], // Only persist checkoutData
};

// Combine reducers
const rootReducer = combineReducers({
  map: mapSlice,
  user: userSlice,
  checkout: persistReducer(checkoutPersistConfig, checkoutSlice),
  [baseApi.reducerPath]: baseApi.reducer,
});

// Create store (works on both server and client)
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
