import { createSlice } from "@reduxjs/toolkit";

const initState = {
  allPermission: [],
  searchPermission: [],
};
const PermissionSlice = createSlice({
  name: "permissions",
  initialState: initState,
  reducers: {
    setAllPermissions: (state, { payload }) => {
      state.allPermission = payload;
    },
    setSearchPermissions: (state, { payload }) => {
      state.searchPermission = payload;
    },
  },
});

export const { setAllPermissions, setSearchPermissions } = PermissionSlice.actions;

export default PermissionSlice.reducer;
