import { Link, useNavigate } from "react-router-dom";
import avatar from "../../asset/img/NTNM.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../thunks/AuthThunk";
import { setAlert } from "../../slices/AlertSlice";
import { useState } from "react";

function Login() {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { logged } = useSelector((state) => state.authReducer)

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const nav = useNavigate();

  const handleLogin = () => {
    if (validate()) {
      dispatch(login({username: username, password})).then((resp) => {
        if (!resp?.error) {
          nav('/')
        }
      })
    }
  }

  const validate = () => {
    if (username === "") {
      dispatch(setAlert({ type: "error", content: "Tên đăng nhập không được bỏ trống" }));

      return false;
    }
    if (password === "" ) {
      dispatch(setAlert({type: "error", content: "Mật khẩu không được để trống"}))

      return false
    }
   
    return true;
  }


  return (
    <article className="bg-cyan-50 h-screen w-full my-auto flex items-center ">
      <div className="w-full xl:w-4/12 md:w-8/12 lg:w-6/12 bg-white border rounded-md h-auto md:m-auto my-auto p-8 m-4 shadow-md">
        <div className="logo pb-5">
          <img src={avatar} alt="logo" />
        </div>
        <hr />
        <h3 className="font-bold text-xl leading-10 pt-5">Chào mừng</h3>
        <p className="subtitle-login text-sm text-neutral-500 leading-7">
          Vui lòng nhập email/số điện thoại và mật khẩu của bạn để đăng nhập:
        </p>
        <form action="" className="py-0 sm:py-4">
          <div className="username border-b-2 border-b-stone-100 py-5">
            <div className="grid grid-cols-3 ">
              <div className="my-auto ">
                <span className="font-medium text-sm">
                  Email/Số điện thoại:
                </span>
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  name="username"
                  value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  className="rounded-md w-full border border-slate-200 outline-slate-200 p-2  text-sm text-slate-500"
                  required
                />
              </div>
            </div>
          </div>
          <div className="password border-b-2 border-b-stone-100 py-5">
            <div className="grid grid-cols-3 ">
              <div className="my-auto ">
                <span className="font-medium text-sm">Password:</span>
              </div>
              <div className="col-span-2">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  className="rounded-md w-full border border-slate-200 outline-slate-200 p-2  text-sm text-slate-500"
                  required
                />
              </div>
            </div>
          </div>
          <div className="forgot-password text-end">
            <Link
              to="/forgot-password"
              className="text-xs font-medium underline text-neutral-500 "
            >
              forgot password?
            </Link>
          </div>
          <div className="text-center py-3">
            <button
              type="reset"
              className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 min-w-full sm:min-w-[50%] "
              onClick={handleLogin}
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </article>
  );
}

export default Login;
