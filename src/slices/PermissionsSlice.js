import { createSlice } from "@reduxjs/toolkit";

const initState = {
  allPermission: [],
};
const PermissionSlice = createSlice({
  name: "permissions",
  initialState: initState,
  reducers: {
    setAllPermissions: (state, { payload }) => {
      state.allPermission = payload;
    },
  },
});

export const { setAllPermissions } = PermissionSlice.actions;

export default PermissionSlice.reducer;
