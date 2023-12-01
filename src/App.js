import './App.css'
import '@fontsource/inter'
import './index.css'
import './asset/css/style.css'
import './asset/css/admin.css'
import Router from './routes/index.jsx'
import './asset/js/js.js'
import { useDispatch, useSelector } from 'react-redux'
import { useLayoutEffect } from 'react'
import { setAlert } from './slices/AlertSlice.js'
import { loadUser } from './slices/AuthSlice.js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const { refresh, logged } = useSelector((state) => state.authReducer)
  const { msg } = useSelector((state) => state.alertReducer)

  const notify = (msg) => {
    switch (msg.type) {
      case 'success':
        toast.success(msg.content)
        break
      case 'error':
        toast.error(msg.content)
        break
    }
  }
  const dispatch = useDispatch()
  useLayoutEffect(() => {
    dispatch(loadUser())
  }, [refresh])
  useLayoutEffect(() => {
    if (Object.keys(msg).length !== 0) {
      notify(msg)
      dispatch(setAlert({}))
    }
  }, [msg])
  return (
    <div>
      <Router />
      <ToastContainer />
    </div>
  )
}

export default App
