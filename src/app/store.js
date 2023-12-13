import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slices/AuthSlice.js";
import AlertReducer from "../slices/AlertSlice.js";
import RoleReducer from "../slices/RoleSlice.js";
import PermissionsReducer from "../slices/PermissionsSlice.js";
import KpiCategoriesReducer from "../slices/KPICategoriesSlice.js";
import JobsReducer from "../slices/JobsSlice.js";
import UserReducer from "../slices/UserSlide.js";
import KpiManagerReducer from "../slices/KPIManagerSlice.js";

export const store = configureStore({
    reducer: {
      authReducer: AuthReducer,
      alertReducer: AlertReducer,
      roleReducer: RoleReducer,
      permissionsReducer: PermissionsReducer,
      kpiCategoriesReducer: KpiCategoriesReducer,
      jobsReducer: JobsReducer,
      userReducer: UserReducer,
      kpiManagerReducer: KpiManagerReducer,

    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
  