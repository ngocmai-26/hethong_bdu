import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../constants/api'

import { setAlert } from '../slices/AlertSlice'
import { setRefresh } from '../slices/AuthSlice'


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
      return dataJson
    } catch (e) {
      console.log(e)
    }
  },
)

