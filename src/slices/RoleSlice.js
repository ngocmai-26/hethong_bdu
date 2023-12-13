import { createSlice } from "@reduxjs/toolkit";

const initState = {
  role: [],
  allRole: [],
  singleRole: {},
  manager: {
    roles: [],
    roleUpdate: {},
  },
  listPermission: [],
  actionStatusCode: 0,
  searchRole: [],
};
const RoleSlice = createSlice({
  name: "role",
  initialState: initState,
  reducers: {
    setRole: (state, {payload}) => {
      state.role = payload;
    },
    setAllRole: (state, { payload }) => {
      state.allRole = payload;
      localStorage.setItem("role", JSON.stringify(payload));
    },
    setSingleRole: (state, { payload }) => {
      state.singleRole = payload;
    },
    setRoleUpdate: (state, { payload }) => {
      state.manager.roleUpdate = payload;
    },
    setListPermission: (state, {payload}) => {
      state.listPermission = payload
    },
    setActionStatus: (state, { payload }) => {
      state.actionStatusCode = payload
    },
    setSearchRole: (state, { payload }) => {
      state.searchRole = payload
    },
  },
});

export const { setAllRole, setSingleRole,setRoleUpdate, setListPermission, setRole, setActionStatus,setSearchRole } = RoleSlice.actions;

export default RoleSlice.reducer;