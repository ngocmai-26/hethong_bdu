import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../constants/api'
import { setKPICategories, setActionStatus, setSingleKPICategories } from '../slices/KPICategoriesSlide'
import { setAlert } from '../slices/AlertSlice'

const token = localStorage.getItem("auth_token");
export const getAllKPICategories = createAsyncThunk(
  '/kpi_categories',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const resp = await fetch(`${API.uri}/kpi_categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.status >= 200 && resp.status < 300) {
        const dataJson = await resp.json()
        dispatch(setKPICategories(dataJson?.response?.content))
      }
    } catch (e) {
      console.log(e)
    }
  },
)

export const addNewKPICate = createAsyncThunk(
  'kpi_categories/add',
  async (data, { dispatch, rejectWithValue }) => {
    if (!token) {
      dispatch(
        setKPICategories({
          type: 'error',
          content: 'Phiên đăng nhập đã hết hạn vui lòng thử lại',
        }),
      )
    }
    const resp = await fetch(`${API.uri}/kpi_categories`, {
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
      dispatch(getAllKPICategories())
    }
    dispatch(setActionStatus(resp.status))
  },
)

export const deleteKPICategories = createAsyncThunk(
  "/kpi_categories/id",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const resp = await fetch(`${API.uri}/kpi_categories/${id}`, {
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
      dispatch(getAllKPICategories());
    } catch (e) {
      dispatch(
        setAlert({ type: "error", content: "Error when delete kpi category" })
      );
    }
  }
);

export const updateKPICategories = createAsyncThunk(
  "/kpi_categories/id",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const resp = await fetch(`${API.uri}/kpi_categories/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (resp.status >= 200 && resp.status < 300) {
        dispatch(
          setAlert({ type: "success", content: "Update kpi categories success" })
        );
        dispatch(getAllKPICategories());
      } else {
        dispatch(
          setAlert({
            type: "error",
            content: resp.json()?.defaultMessage ?? "Update role error ",
          })
        );
        dispatch(getAllKPICategories())
      }
      dispatch(setActionStatus(resp.status))
    } catch (e) {
      console.log(e);
    }
  }
);

export const getKPICateById = createAsyncThunk(
  "/kpi_categories/id",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      let uri = `${API.uri}/kpi_categories/${id}`;
      const resp = await fetch(uri, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.status >= 200 && resp.status < 300) {
        const jsonData = await resp.json();
        dispatch(setSingleKPICategories(jsonData));
      }
    } catch (e) {
      console.log(e);
    }
  }
);
