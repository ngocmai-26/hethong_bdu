import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../constants/api'

import { setAlert } from '../slices/AlertSlice'
import { setActionStatus, setKPIManager, setSingleKPIManager } from '../slices/KPIManagerSlice'

export const getAllKPIManager = createAsyncThunk(
  '/kpis',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/kpis`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.status >= 200 && resp.status < 300) {
        const dataJson = await resp.json()
        dispatch(setKPIManager(dataJson?.response?.content))
      }
    } catch (e) {
      console.log(e)
    }
  },
)

export const addNewKPIManager = createAsyncThunk(
  'kpis',
  async (data, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      dispatch(
        setKPIManager({
          type: 'error',
          content: 'Phiên đăng nhập đã hết hạn vui lòng thử lại',
        }),
      )
    }
    const resp = await fetch(`${API.uri}/kpis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    if (resp.status >= 200 && resp.status < 400) {
      dispatch(
        setAlert({ type: 'success', content: 'Thêm danh mục kpi thành công' }),
      )
      dispatch(getAllKPIManager())
    }
    dispatch(setActionStatus(resp.status))
  },
)

export const deleteKPIManager = createAsyncThunk(
  "/kpis/id",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/kpis/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.status < 200 || resp.status >= 400) {
        dispatch(
          setAlert({
            type: "error",
            content: resp.json()?.defaultMessage ?? "Error when delete kpi category",
          })
        );
        return rejectWithValue();
      }
      dispatch(setAlert({ type: "success", content: "Success" }));
      dispatch(getAllKPIManager());
    } catch (e) {
      dispatch(
        setAlert({ type: "error", content: "Error when delete kpi category" })
      );
    }
  }
);

export const updateKPIManager = createAsyncThunk(
  "/kpis/id",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/kpis/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (resp.status >= 200 && resp.status < 300) {
        dispatch(
          setAlert({ type: "success", content: "Update kpi Manager success" })
        );
        dispatch(getAllKPIManager());
      } else {
        dispatch(
          setAlert({
            type: "error",
            content: resp.json()?.defaultMessage ?? "Update role error ",
          })
        );
        dispatch(getAllKPIManager())
      }
      dispatch(setActionStatus(resp.status))
    } catch (e) {
      console.log(e);
    }
  }
);

export const getKPIManagerById = createAsyncThunk(
  "/kpis/id",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("auth_token");
      let uri = `${API.uri}/kpis/${id}`;
      const resp = await fetch(uri, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.status >= 200 && resp.status < 300) {
        const jsonData = await resp.json();
        dispatch(setSingleKPIManager(jsonData.response));
      }
    } catch (e) {
      console.log(e);
    }
  }
);
