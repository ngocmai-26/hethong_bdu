import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slices/AuthSlice.js";
import AlertReducer from "../slices/AlertSlice.js";
import RoleReducer from "../slices/RoleSlice.js";

export const store = configureStore({
    reducer: {
      authReducer: AuthReducer,
      alertReducer: AlertReducer,
      roleReducer: RoleReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
  