import { createSlice } from "@reduxjs/toolkit";

const initState = {
  users: [],
  search: [],
  allUser: [],
  refresh: false,
  searchUser: [],
  manager: {
    users: [],
    userUpdate: {},
  },
};
const UserSlice = createSlice({
  name: "users",
  initialState: initState,
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    setAllUser: (state, { payload }) => {
      state.allUser = payload;
    },
    setSearchUser: (state, { payload }) => {
      state.searchUser = payload;
    },
    setUserUpdate: (state, { payload }) => {
      state.manager.userUpdate = payload;
    },
  },
});

export const { setUsers ,setSearchUser, setAllUser} = UserSlice.actions;

export default UserSlice.reducer;