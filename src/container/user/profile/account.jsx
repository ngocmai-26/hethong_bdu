import { useState } from "react";
import Profile from ".";

function Account() {
  const info = JSON.parse(localStorage.getItem('auth_info'))
  const [hiddenChangePassword, setHiddenChangePassword] = useState(true);
  const handleChangePassword = () => {
    setHiddenChangePassword(!hiddenChangePassword);
  };
  return (
    <>
      <Profile>
        <form action="">
          <div className="profile-content p-5">
            <p className="text-base font-medium">Thông tin cá nhân</p>
            <div className="general py-4">
              <p className="text-sky-500 border-b-2 border-b-stone-100">
                Thông tin chung
              </p>
              <div className="picture border-b-2 border-b-stone-100 py-5">
                <div className="grid grid-cols-5 gap-5">
                  <div className="my-auto">
                    <span className="font-medium text-xs">Avatar:</span>
                  </div>
                  <div className="col-span-2 mx-auto">
                    <div className="avatar-upload my-2">
                      <img
                        src="https://nhadepso.com/wp-content/uploads/2023/03/cap-nhat-99-hinh-anh-avatar-gau-cute-de-thuong-ngo-nghinh_1.jpg"
                        alt="avatar-upload"
                        className="w-32 h-32"
                      />
                    </div>
                    <div className="upload-img">
                      <input
                        id="dropzone-file"
                        type="file"
                        className="text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="name border-b-2 border-b-stone-100 py-5">
                <div className="grid grid-cols-5 gap-5">
                  <div className="my-auto">
                    <span className="font-medium text-xs">Họ và tên:</span>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      name="fullName"
                      value={info?.fullName}
                      id="fullName"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5"
                      placeholder="Bonnie"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="password border-b-2 border-b-stone-100 py-5">
                <div className="grid grid-cols-5 gap-5">
                  <div className="my-auto">
                    <span className="font-medium text-xs">Mật khẩu:</span>
                  </div>
                  <div className="col-span-2">
                    <button
                      type="button"
                      className="text-red-500 text-xs hover:text-red-700"
                      onClick={() => handleChangePassword()}
                    >
                      Thay đổi mật khẩu
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="contacts py-4">
              <p className="text-sky-500 border-b-2 border-b-stone-100">
                Liên hệ
              </p>

              <div className="email border-b-2 border-b-stone-100 py-5">
                <div className="grid grid-cols-5 gap-5">
                  <div className="my-auto">
                    <span className="font-medium text-xs">Email:</span>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="email"
                      name="email"
                      value={info?.email}
                      id="email"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5"
                      placeholder="mai@gmail.com"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="phone border-b-2 border-b-stone-100 py-5">
                <div className="grid grid-cols-5 gap-5">
                  <div className="my-auto">
                    <span className="font-medium text-xs">Số điện thoại:</span>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      name="phone"
                      value={info?.phone}
                      id="phone"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5"
                      placeholder="Nhập vào số điện thoại"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="address border-b-2 border-b-stone-100 py-5">
                <div className="grid grid-cols-5 gap-5">
                  <div className="my-auto">
                    <span className="font-medium text-xs">Địa chỉ:</span>
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      name="address"
                      defaultValue="mai@gmail.com"
                      id="address"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5"
                      placeholder="mai@gmail.com"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="button text-right">
              <button
                type="button"
                className="bg-blue-500 text-white py-1.5 px-3.5 rounded-md text-sm "
              >
                Lưu
              </button>
            </div>
          </div>
        </form>
      </Profile>
      <div
        className={`fixed left-0 right-0 z-50 items-center justify-center ${
          hiddenChangePassword ? "hidden" : "flex"
        } bg-[#e3e3e387] overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full`}
        id="delete-user-modal"
      >
        <div className="relative w-full h-full max-w-xl px-4 md:h-auto m-auto ">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                data-modal-toggle="delete-user-modal"
                onClick={() => handleChangePassword()}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="p-6 pt-0">
              <div
                id="toast-warning"
                className={`flex items-center w-full py-4 px-3 text-gray-500 rounded-lg bg-sky-100 my-2`}
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
                  <p className="leading-6">
                    Mật khẩu phải có ít nhất 8 ký tự, bao gồm 1 chữ in hoa và 1
                    số.
                  </p>
                </div>
              </div>
              <form action="" className="py-0  ">
                <div className="border-b-2 py-3">
                  <div className="currentPassword grid grid-cols-3 gap-5 py-2">
                    <label htmlFor="" className="text-sm my-auto">
                      Mật khẩu hiện tại:
                    </label>
                    <div className="col-span-2">
                      <input
                        type="password"
                        id="currentPassword"
                        className="rounded-sm w-full border border-slate-200 outline-slate-200 text-sm leading-3 p-2 me-4"
                      />
                    </div>
                  </div>

                  <div className="newPassword grid grid-cols-3 gap-5 py-2">
                    <label htmlFor="" className="text-sm my-auto">
                      Mật khẩu mới:
                    </label>
                    <div className="col-span-2">
                      <input
                        type="password"
                        id="newPassword"
                        className="rounded-sm w-full border border-slate-200 outline-slate-200 text-sm leading-3 p-2 me-4"
                      />
                    </div>
                  </div>
                  <div className="repeatPassword grid grid-cols-3 gap-5 py-2">
                    <label htmlFor="" className="text-sm my-auto">
                      Nhập lại mật khẩu mới:
                    </label>
                    <div className="col-span-2">
                      <input
                        type="password"
                        id="repeatPassword"
                        className="rounded-sm w-full border border-slate-200 outline-slate-200 text-sm leading-3 p-2 me-4"
                      />
                    </div>
                  </div>
                </div>
                <div className="button text-right pt-5">
                  <button
                    type="button"
                    className="bg-blue-500 text-white py-1.5 px-3.5 rounded-md text-sm "
                  >
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
