import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../constants/api'
import { setAlert } from '../slices/AlertSlice'
import { setActionStatus, setAllJob, setJobs, setSingleJob } from '../slices/JobsSlice'

const token = localStorage.getItem('auth_token')
export const getAllJob = createAsyncThunk(
  '/jobs',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const resp = await fetch(`${API.uri}/jobs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.status >= 200 && resp.status < 300) {
        const dataJson = await resp.json()
        dispatch(setAllJob(dataJson?.response?.content))
      }
    } catch (e) {
      console.log(e)
    }
  },
)

export const addNewJob = createAsyncThunk(
  'job/add',
  async (data, { dispatch, rejectWithValue }) => {
    if (!token) {
      dispatch(
        setAllJob({
          type: 'error',
          content: 'Phiên đăng nhập đã hết hạn vui lòng thử lại',
        }),
      )
    }
    const resp = await fetch(`${API.uri}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    if (resp.status >= 200 && resp.status < 300) {
      dispatch(
        setAlert({ type: 'success', content: 'Thêm công việc thành công' }),
      )
      dispatch(getAllJob())
    }
    dispatch(setActionStatus(resp.status))
  },
)

export const deleteJob = createAsyncThunk(
  '/jobs/id',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const resp = await fetch(`${API.uri}/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (resp.status < 200 || resp.status >= 400) {
        dispatch(
          setAlert({
            type: 'error',
            content: resp.json()?.defaultMessage ?? 'Error when delete role',
          }),
        )
        return rejectWithValue()
      }
      dispatch(setAlert({ type: 'success', content: 'Success' }))
      dispatch(getAllJob())
    } catch (e) {
      dispatch(setAlert({ type: 'error', content: 'Error when delete job' }))
    }
  },
)

export const getJobById = createAsyncThunk(
  "/jobs/id",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      let uri = `${API.uri}/jobs/${id}`;

      const resp = await fetch(uri, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.status >= 200 && resp.status < 300) {
        const jsonData = await resp.json();
        dispatch(setSingleJob(jsonData));
        
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const updateJob = createAsyncThunk(
  "/jobs/id",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      console.log("here");
      const token = localStorage.getItem("auth_token");
      const resp = await fetch(`${API.uri}/jobs/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (resp.status >= 200 && resp.status < 300) {
        dispatch(
          setAlert({ type: "success", content: "Update role success" })
        );
        dispatch(getAllJob());
      } else {
        dispatch(
          setAlert({
            type: "error",
            content: resp.json()?.defaultMessage ?? "Update role error ",
          })
        );
        dispatch(getAllJob())
      }
    } catch (e) {
      console.log(e);
    }
  }
);