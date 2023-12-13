import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../thunks/AuthThunk";
import { setAlert } from "../../slices/AlertSlice";
import { useNavigate } from "react-router-dom";
import { setEmailAuth } from "../../slices/AuthSlice";

function ForgotPassword() {
  const [hiddenToast, setHiddenToast] = useState(true);
  const handleCloseToast = () => {
    setHiddenToast(!hiddenToast);
  };
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleForgot = () => {
    if (email.length <= 0) {
      dispatch(
        setAlert({ type: "error", content: "notify_valid_email" })
      );
      return;
    }
    dispatch(forgotPassword(email)).then((resp) => {
      if (!resp?.error) {
        nav("/confirm-password");
      }
      
    dispatch(setEmailAuth(email))
    });
  };
  return (
    <article className="bg-cyan-50 h-screen w-full my-auto flex items-center ">
      <div className="w-full xl:w-4/12 md:w-8/12 lg:w-6/12 bg-white border rounded-md h-auto md:m-auto my-auto p-8 m-4 shadow-md">
        <div className="logo pb-5">
          <h3 className="font-bold text-xl leading-4">Password reminder</h3>
        </div>
        <hr />
        <div
          id="toast-warning"
          className={`flex items-center w-full py-4 px-3 text-gray-500 rounded-lg bg-sky-100 border-s-4 border-s-cyan-500 my-2 ${
            hiddenToast ? "block" : "hidden"
          }`}
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8  rounded-lg text-sky-600">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
            </svg>
            <span className="sr-only">Warning icon</span>
          </div>
          <div className="ml-3 text-sm font-normal">
            Vui lòng nhập địa chỉ email được liên kết với tài khoản NTNM của
            bạn. Chúng tôi sẽ gửi cho bạn thông tin về cách cập nhật mật khẩu
            của bạn..
          </div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-transparent text-gray-400 hover:text-gray-900 p-1.5 inline-flex items-center justify-center h-8 w-8 focus:bg-transparent"
            data-dismiss-target="#toast-warning"
            aria-label="Close"
            onClick={() => handleCloseToast()}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        <form action="" className="py-0">
          <div className="email flex flex-col sm:flex-row py-2 ">
            <input
              type="email"
              id="email"
              className="rounded-md w-full border border-slate-200 outline-slate-200 text-sm leading-3 p-2 me-4"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="button"
              onClick={handleForgot}
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

export default ForgotPassword;
