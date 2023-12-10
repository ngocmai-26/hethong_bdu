import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slices/AuthSlice.js";
import AlertReducer from "../slices/AlertSlice.js";
import RoleReducer from "../slices/RoleSlice.js";
import PermissionsReducer from "../slices/PermissionsSlice.js";
import KpiCategoriesReducer from "../slices/KPICategoriesSlide.js";

export const store = configureStore({
    reducer: {
      authReducer: AuthReducer,
      alertReducer: AlertReducer,
      roleReducer: RoleReducer,
      permissionsReducer: PermissionsReducer,
      kpiCategoriesReducer: KpiCategoriesReducer,

    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
  