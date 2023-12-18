import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../constants/api'

import { setAlert } from '../slices/AlertSlice'
import { logout, setRefresh } from '../slices/AuthSlice'


export const login = createAsyncThunk(
  '/public/auth/login',
  async (loginData, { rejectWithValue, dispatch }) => {
    try {
      const resp = await fetch(`${API.uri}/public/auth/login`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })
      const dataJson = await resp.json()
      if (resp.status >= 300) {
        dispatch(
          setAlert({
            type: 'error',
            content: dataJson?.message,
          }),
        )
        return rejectWithValue('something error')
      }
      dispatch(setAlert({ type: 'success', content: 'Đăng nhập thành công' }))
      localStorage.setItem(
        'auth_info',
        JSON.stringify(dataJson?.response?.user, dataJson?.response?.role),
      )
      localStorage.setItem('auth_token', dataJson.response?.token)
      localStorage.setItem('auth_role', JSON.stringify(dataJson.response?.role))
      dispatch(setRefresh(true))
      console.log("dataJson", dataJson)
      return dataJson
    } catch (e) {
      console.log(e)
    }
  },
)

export const changePassword = createAsyncThunk(
  "/public/auth/change-password",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      let token = localStorage.getItem("auth_token");
      if (!token) {
        dispatch(
          setAlert({
            type: "error",
            content: '"Có lỗi xảy ra hãy thử đăng nhập lại"',
          })
        );
        return rejectWithValue("");
      }
      const resp = await fetch(`${API.uri}/public/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userName: data.userName,
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        }),
      });
      if (resp.status >= 300) {
        const dataJson = await resp.json();
        dispatch(
          setAlert({
            type: "error",
            content: dataJson?.message,
          })
        );
        return;
      }
      dispatch(
        setAlert({ type: "success", content: "Đổi mật khẩu thành công" })
      );
    } catch (e) {
      console.log(e);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "/public/auth/password-reset/request",
  async (email, { dispatch, rejectWithValue }) => {
    try {
      const resp = await fetch(`${API.uri}/public/auth/password-reset/request`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      if (resp.status >= 300) {
        const dataJson = await resp.json();
        dispatch(
          setAlert({
            type: "error",
            content: dataJson?.defaultMessage,
          })
        );
        return rejectWithValue("something error");
      }
      dispatch(
        setAlert({ type: "success", content: "Hãy kiểm tra mail của bạn" })
      );
    } catch (e) {
      console.log(e);
    }
  }
);

export const confirmPassword = createAsyncThunk(
  "/public/auth/password-reset/confirm",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const resp = await fetch(`${API.uri}/public/auth/password-reset/confirm`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          code: data.code,
          newPassword: data.newPassword
        }),
      });
      console.log("dataJson", resp)
      if (resp.status == 500) {
        const dataJson = await resp.json();
        dispatch(
          setAlert({
            type: "error",
            content: "Hãy kiểm tra lại mã code của bạn",
          })
        );
        return rejectWithValue("something error");
      }
      if (resp.status >= 300) {
        const dataJson = await resp.json();
        dispatch(
          setAlert({
            type: "error",
            content: dataJson?.defaultMessage,
          })
        );
        return rejectWithValue("something error");
      }
      
      dispatch(
        setAlert({ type: "success", content: "Bạn đã đổi mật khẩu thành công" })
      );
    } catch (e) {
      console.log(e);
    }
  }
);



