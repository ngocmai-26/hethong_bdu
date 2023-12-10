import { createAsyncThunk } from '@reduxjs/toolkit'
import { setAllPermissions } from '../slices/PermissionsSlice'
import { API } from '../constants/api'

export const getAllPermissions = createAsyncThunk(
    "/permissions",
    async (_, { dispatch, rejectWithValue }) => {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/permissions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.status >= 200 && resp.status < 300) {
        const dataJson = await resp.json();
        dispatch(setAllPermissions(dataJson));
      }
    }
  );