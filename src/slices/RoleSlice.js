import { createSlice } from "@reduxjs/toolkit";

const initState = {
  allRole: [],
};
const RoleSlice = createSlice({
  name: "role",
  initialState: initState,
  reducers: {
    setAllRole: (state, { payload }) => {
      state.allRole = payload;
      localStorage.setItem("role", JSON.stringify(payload));
    },
  },
});

export const { setAllRole } = RoleSlice.actions;

export default RoleSlice.reducer;