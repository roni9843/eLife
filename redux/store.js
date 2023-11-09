import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./apiSlice.js";
import { usersSlice } from "./userSlice.js";

// ? redux store
export const store = configureStore({
  reducer: {
    userInfo: usersSlice.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});
