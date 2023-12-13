import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmPassword, forgotPassword } from "../../thunks/AuthThunk";
import { setAlert } from "../../slices/AlertSlice";
import { useNavigate } from "react-router-dom";

function ConfirmPassword() {
    const { email } = useSelector((state) => state.authReducer);
    const [code, setCode] = useState("")
    const [newPassword , setNewPassword] = useState("")
    const dispatch = useDispatch();
    const nav = useNavigate();
    const handleSubmit = () => {
        if(newPassword === "") {
            dispatch(
                setAlert({ type: "error", content: "Mật khẩu mới không được bỏ trống" })
              );
              return
        }
        const data = {
            email: email,
            code: code,
            newPassword:newPassword
        }
        dispatch(confirmPassword(data)).then((resp) => {
            if (!resp?.error) {
              nav("/login");
            }
            setAlert({ type: "error", content: resp?.error })
            
          });
    }

    const handleSendAgain = () => {
        dispatch(forgotPassword(email))
    }
  return (
    <article className="bg-cyan-50 h-screen w-full my-auto flex items-center ">
      <div className="w-full xl:w-4/12 md:w-8/12 lg:w-6/12 bg-white border rounded-md h-auto md:m-auto my-auto p-8 m-4 shadow-md">
        <div className="logo pb-5">
          <h3 className="font-bold text-xl leading-4">Password reminder</h3>
        </div>
        <hr></hr>
        <form action="" className="py-0">
          <div className="code flex flex-col sm:flex-row py-5">
            <input
              type="text"
              id="code1"
              onChange={(e) => setCode(e.target.value)}
              className="rounded-md w-full border border-slate-200 outline-slate-200 text-sm leading-3 p-2 me-4"
              placeholder="Nhập mã code "
            />
            <input
              type="text"
              id="code1"
              onChange={(e) => setNewPassword(e.target.value)}
              className="rounded-md w-full border border-slate-200 outline-slate-200 text-sm leading-3 p-2 me-4"
              placeholder="Nhập mật khẩu mới"
            />
            
          </div>
           <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSendAgain}
              className="text-white bg-red-300 hover:bg-red-400 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2 me-2"
            >
              Gửi lại mã code
            </button>
           <button
              type="button"
              onClick={handleSubmit}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2 "
            >
              Gửi
            </button>
           </div>
        </form>
      </div>
    </article>
  );
}

export default ConfirmPassword;
