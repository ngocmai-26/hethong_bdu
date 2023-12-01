import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAllRole } from "../slices/RoleSlice";
import { API } from "../constants/api";

const token = localStorage.getItem('auth_token')
console.log(token)
export const getAllRole = createAsyncThunk(
    "/roles/getAll",
    async (_, { dispatch, rejectWithValue }) => {
        try {
      const resp = await fetch(`${API.uri}/roles/getAll`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.status >= 200 && resp.status < 300) {
        const dataJson = await resp.json();
        dispatch(setAllRole(dataJson?.response?.content));
      }
    }catch (e) {
        console.log(e);
      }
    }
);