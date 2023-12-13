import { createSlice } from '@reduxjs/toolkit'

const initState = {
  logged: false,
  authToken: '',
  user: {},
  refresh: false,
  actionStatusCode: 0,
  email:'',
}
const AuthSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    setLogged: (state, { payload }) => {
      state.logged = payload
    },
    setAuthData: (state, { payload }) => {
      state.user = payload
    },
    setUser: (state, { payload }) => {
      state.user = payload
      
      localStorage.setItem('auth_info', JSON.stringify(payload))
    },
    setActionStatus: (state, { payload }) => {
      state.actionStatusCode = payload
    },
    setRefresh: (state, { payload }) => {
      state.refresh = payload
    },
    setEmailAuth: (state, { payload }) => {
      state.email = payload
    },
    loadUser: (state) => {
      const token = localStorage.getItem('auth_token')
      const user = localStorage.getItem('auth_info')
      if (user && token ) {
        state.user = JSON.parse(user)
        state.authToken = token
        state.logged = true
      } else {
        state = initState
      }
    },
    logout: (state) => {
      localStorage.removeItem('auth_info')
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_role')
      state = initState
      window.location.assign(window.location.href)
    },
  },
})

export const {
  setLogged,
  loadUser,
  logout,
  setRefresh,
  setActionStatus,
  setUser,
  setEmailAuth
} = AuthSlice.actions

export default AuthSlice.reducer
