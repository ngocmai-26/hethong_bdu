import { useEffect, useLayoutEffect, useState } from "react";

import LayoutAdmin from "../layout";
import validator from "validator";
import { register } from "../../../thunks/AuthThunk";
import { useDispatch, useSelector } from "react-redux";
import { getAllRole } from "../../../thunks/RoleThunk";
import {
  addUser,
  deleteUser,
  getAllUser,
  updateUser,
} from "../../../thunks/UserThunk";
import { setActionStatus } from "../../../slices/AuthSlice";
import styled from "styled-components";
import { setSearchUser } from "../../../slices/UserSlide";
import moment from "moment";
const ErrorText = styled.div`
  color: red;
  text-align: start;
`;
function AccountManager() {
  const [isHiddenDelete, setIsHiddenDelete] = useState(true);
  const [isHiddenUpdate, setIsHiddenUpdate] = useState(true);
  const [isHiddenCreate, setIsHiddenCreate] = useState(true);

  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [roleName, setRoleName] = useState("");
  const [managerId, setManagerId] = useState("");
  const [search, setSearch] = useState("");
  const [phong_ban, setPhong_ban] = useState("");
  const [status, setStatus] = useState(1);
  const [birthday, setBirthday] = useState(1);
  const [userUpdate, setUserUpdate] = useState({});
  const [user, setUser] = useState({});
  const [idUser, setIdUser] = useState({});

  const { allRole } = useSelector((state) => state.roleReducer);
  const { actionStatusCode } = useSelector((state) => state.authReducer);
  const { allUser, searchUser } = useSelector((state) => state.userReducer);

  console.log(allUser);

  const dispatch = useDispatch();
  const initError = {
    isErrorUserName: false,
    isErrorPassword: false,
    isErrorEmail: false,
    isErrorPhone: false,
    isErrorPhongban: false,
    isErrorBirthday: false,
    isErrorRole: false,

    messageErrorUserName: "",
    messageErrorEmail: "",
    messageErrorPassword: "",
    messageErrorPhone: "",
    messageErrorPhongban: "",
    messageErrorBirthday: "",
    messageErrorRole: "",
  };

  useLayoutEffect(() => {
    dispatch(getAllRole());
    if (allUser.length <= 0) {
      dispatch(getAllUser());
    }
  }, []);

  useEffect(() => {
    const listSearchUser = allUser?.filter((item) =>
      item?.user?.email.toLowerCase().includes(search.toLowerCase())
    );
    if (listSearchUser?.length !== 0) {
      dispatch(setSearchUser(listSearchUser));
    }
  }, [search]);

  useEffect(() => {
    if (allUser.length > 0) {
      dispatch(setSearchUser(allUser));
    }
  }, [allUser, dispatch]);

  const handleHiddenUpdate = (item) => {
    setIsHiddenUpdate(!isHiddenUpdate);
    setUser(item);
  };
  const handleHiddenCreate = () => {
    setIsHiddenCreate(!isHiddenCreate);
  };

  const [error, setError] = useState(initError);
  const onClickRegister = () => {
    if (fullName?.length === 0) {
      return setError(
        (pre) =>
          (pre = {
            ...pre,
            isErrorUserName: true,
            messageErrorUserName: "Không được bỏ trống",
          })
      );
    }
    if (email?.length === 0) {
      return setError(
        (pre) =>
          (pre = {
            ...pre,
            isErrorEmail: true,
            messageErrorEmail: "không được bỏ trống",
          })
      );
    }
    if (phone?.length === 0) {
      return setError(
        (pre) =>
          (pre = {
            ...pre,
            isErrorPhone: true,
            messageErrorPhone: "không được bỏ trống",
          })
      );
    }
    if (phong_ban?.length === 0) {
      return setError(
        (pre) =>
          (pre = {
            ...pre,
            isErrorPhongban: true,
            messageErrorPhongban: "Không được bỏ trống",
          })
      );
    }
    if (roleName?.length === 0) {
      return setError(
        (pre) =>
          (pre = {
            ...pre,
            isErrorRole: true,
            messageErrorRole: "Không được bỏ trống",
          })
      );
    }
    if (birthday?.length === 0) {
      return setError(
        (pre) =>
          (pre = {
            ...pre,
            isErrorBirthday: true,
            messageErrorBirthday: "không được bỏ trống",
          })
      );
    }
    if (password.length === 0) {
      return setError(
        (pre) =>
          (pre = {
            ...pre,
            isErrorPassword: true,
            messageErrorPassword: "không được bỏ trống",
          })
      );
    }
    if (password !== confirmPassword) {
      return setError(
        (pre) =>
          (pre = {
            ...pre,
            isErrorPassword: true,
            messageErrorPassword: "mật khẩu không giống nhau",
          })
      );
    }
    if (!validator.isEmail(email)) {
      return setError(
        (pre) =>
          (pre = {
            ...pre,
            isErrorEmail: true,
            messageErrorEmail: "địa chỉ email không đúng định dạng",
          })
      );
    }

    setError(initError);
    const data = {
      fullName: fullName,
      phone: phone,
      username: email,
      phone: phone,
      roleName: roleName,
      managerId: managerId,
      password: password,
      email: email,
      phong_ban: phong_ban,
      status: status,
      birthday: birthday,
      managerId: managerId,
    };
    dispatch(addUser(data)).then((resp) => {
      if (!resp?.error) {
        setIsHiddenCreate(true);
        setFullName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");
        setRoleName("");
        setBirthday("");
        setPhong_ban("");
        dispatch(setActionStatus(0));
      }
    });
  };
  useEffect(() => {
    setUserUpdate({
      id: user?.id,
      phone: user?.user?.phone,
      birthday: user?.user?.birthday,
      roleName: user?.role?.roleName,
      fullName: user?.user?.fullName,
      username: user?.username,
      email: user?.user?.email,
      status: user?.user?.status,
      phong_ban: user?.user?.phong_ban,
      password: "",
    });
  }, [user]);
  const handleSubmitUpdate = () => {
   
    setError(initError);
    const data = {
      fullName: userUpdate?.fullName,
      id: userUpdate?.id,
      phone: userUpdate?.phone,
      roleName: userUpdate?.roleName,
      email: userUpdate?.email,
      phong_ban: userUpdate?.phong_ban,
      birthday: userUpdate?.birthday,
      managerId: updateUser?.managerId,
    };
    dispatch(updateUser(data));
  };
  return (
    <LayoutAdmin>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 ">
        <div className="w-full mb-1">
          <div className="mb-4">
            <nav className="flex mb-5" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                <li className="inline-flex items-center">
                  <a
                    href="#"
                    className="inline-flex items-center text-gray-700 hover:text-primary-600 "
                  >
                    <svg
                      className="w-5 h-5 mr-2.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    Trang chủ
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span
                      className="ml-1 text-gray-400 md:ml-2 "
                      aria-current="page"
                    >
                      Tài khoản
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Tất cả các tài khoản
            </h1>
          </div>
          <div className="items-center justify-between flex md:divide-x md:divide-gray-100 ">
            <div className="flex items-center  sm:mb-0 my-auto">
              <form className="sm:pr-3" action="#" method="GET">
                <label htmlFor="accounts-search" className="sr-only">
                  Tìm kiếm
                </label>
                <div className="relative w-48 mt-1 sm:w-64 xl:w-96 my-auto">
                  <input
                    type="text"
                    name="email"
                    id="accounts-search"
                    className="bg-gray-50 border border-gray-300  my-auto text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    placeholder="Tìm kiếm tài khoản bằng email"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <button
              type="button"
              id="createAccountButton"
              className="bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={() => handleHiddenCreate()}
            >
              Thêm tài khoản
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-gray-100 ">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all"
                          aria-describedby="checkbox-1"
                          type="checkbox"
                          className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        />
                        <label htmlFor="checkbox-all" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Tên tài khoản
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Tên đăng nhập
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {searchUser?.map((item, key) => (
                    <tr className="hover:bg-gray-100" key={key}>
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-{{ .id }}"
                            aria-describedby="checkbox-1"
                            type="checkbox"
                            className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                          />
                          <label
                            htmlFor="checkbox-{{ .id }}"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                        <div className="text-base font-semibold text-gray-900">
                          {key + 1}
                        </div>
                      </td>
                      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                        {item?.user.fullName}
                      </td>

                      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                        {item?.user.email}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                        {item?.user.phone}
                      </td>

                      <td className="p-4 space-x-2 whitespace-nowrap">
                        {item.status !== 0 ? (
                          <>
                            <button
                              type="button"
                              id="updateaccountButton"
                              onClick={() => {
                                handleHiddenUpdate(item);
                              }}
                              className="bg-blue-500 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
                            >
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                <path
                                  fillRule="evenodd"
                                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              Chỉnh sửa
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Bạn có muốn xóa công việc này"
                                  )
                                ) {
                                  dispatch(deleteUser(item.id));
                                }
                              }}
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300"
                            >
                              <svg
                                className="w-4 h-4 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              Vô hiệu hóa
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="text-red-600">
                              Tài khoản đã bị vô hiệu hóa
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between ">
        <div className="flex items-center mb-4 sm:mb-0">
          <a
            href="#"
            className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
          >
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
          >
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <span className="text-sm font-normal text-gray-500">
            Hiện thị <span className="font-semibold text-gray-900">1-20</span>{" "}
            of <span className="font-semibold text-gray-900">2290</span>
          </span>
        </div>
      </div>
      {/* update */}

      <div
        className={`fixed left-0 right-0 z-50 items-center justify-center ${
          isHiddenUpdate ? "hidden" : "flex"
        } overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full`}
        id="add-user-modal"
      >
        <div className="relative w-full h-full max-w-2xl m-auto px-4 md:h-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-start justify-between p-5 border-b rounded-t ">
              <h3 className="text-xl font-semibold">Chỉnh sửa khoản mới</h3>
              <button
                type="button"
                onClick={() => handleHiddenUpdate()}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                data-modal-toggle="add-user-modal"
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

            <div className="p-6 space-y-6">
              <form action="#">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="fullName"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Tên đầy đủ
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={userUpdate?.fullName}
                      id="fullName"
                      onChange={(e) =>
                        setUserUpdate({
                          ...userUpdate,
                          fullName: e.target.value,
                        })
                      }
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      required
                    />
                    {error.isErrorUserName && (
                      <ErrorText className="text-xs form-text danger">
                        {error.messageErrorUserName}
                      </ErrorText>
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userUpdate?.email}
                      id="email"
                      onChange={(e) =>
                        setUserUpdate({
                          ...userUpdate,
                          email: e.target.value,
                          username: e.target.value,
                        })
                      }
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      required
                    />
                    <ErrorText className="text-xs form-text danger">
                      {error.messageErrorEmail}
                    </ErrorText>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={userUpdate?.phone}
                      id="phone"
                      onChange={(e) =>
                        setUserUpdate({ ...userUpdate, phone: e.target.value })
                      }
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      required
                    />
                    <ErrorText className="text-xs form-text danger">
                      {error.messageErrorPhone}
                    </ErrorText>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="phong_ban"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Phòng ban
                    </label>
                    <input
                      type="text"
                      name="phong_ban"
                      value={userUpdate?.phong_ban}
                      id="phong_ban"
                      onChange={(e) =>
                        setUserUpdate({
                          ...userUpdate,
                          phong_ban: e.target.value,
                        })
                      }
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      required
                    />
                    <ErrorText className="text-xs form-text danger">
                      {error.messageErrorPhongban}
                    </ErrorText>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="birthday"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Ngày sinh
                    </label>
                    <input
                      type="date"
                      name="birthday"
                      value={moment(userUpdate?.birthday).format("YYYY-MM-DD")}
                      id="birthday"
                      onChange={(e) =>
                        setUserUpdate({
                          ...userUpdate,
                          birthday: e.target.value,
                        })
                      }
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      required
                    />
                    <ErrorText className="text-xs form-text danger">
                      {error.messageErrorBirthday}
                    </ErrorText>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="category-create"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Chức vụ
                    </label>
                    <select
                      id="category-create"
                      onChange={(e) => {
                        setUserUpdate({
                          ...userUpdate,
                          roleName: e.target.value,
                        });
                      }}
                      value={userUpdate?.roleName}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    >
                      <option></option>
                      {allRole.map((item, key) => {
                        return (
                          <option value={item.roleName} id={item.id} key={key}>
                            {item.roleName}
                          </option>
                        );
                      })}
                    </select>
                    <ErrorText className="text-xs form-text danger">
                      {error.messageErrorRole}
                    </ErrorText>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="category-create"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Quản lý
                    </label>
                    <select
                      id="category-create"
                      onChange={(e) => {
                        setManagerId(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    >
                      <option selected=""></option>
                      {searchUser.map((item, key) =>
                        item.role.id === 3 && item.status !== 0 ? (
                          <option
                            value={item.user.id}
                            id={item.user.id}
                            key={key}
                          >
                            {item.user.fullName}
                          </option>
                        ) : (
                          <></>
                        )
                      )}
                    </select>
                  </div>
                 
                </div>
                <div className="items-center p-6 border-t border-gray-200 rounded-b ">
                  <button
                    className=" bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="button"
                    onClick={handleSubmitUpdate}
                  >
                    Thêm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* create */}
      <div
        className={`fixed left-0 right-0 z-50 items-center justify-center ${
          isHiddenCreate ? "hidden" : "flex"
        } overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full`}
        id="add-user-modal"
      >
        <div className="relative w-full h-full max-w-2xl m-auto px-4 md:h-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-start justify-between p-5 border-b rounded-t ">
              <h3 className="text-xl font-semibold">Thêm tài khoản mới</h3>
              <button
                type="button"
                onClick={() => handleHiddenCreate()}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                data-modal-toggle="add-user-modal"
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

            <div className="p-6 space-y-6">
              <form action="#">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="fullName"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Tên đầy đủ
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={fullName}
                      id="fullName"
                      onChange={(e) => setFullName(e.target.value)}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      required
                    />
                    {error.isErrorUserName && (
                      <ErrorText className="text-xs form-text danger">
                        {error.messageErrorUserName}
                      </ErrorText>
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      required
                    />
                    <ErrorText className="text-xs form-text danger">
                      {error.messageErrorEmail}
                    </ErrorText>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={phone}
                      id="phone"
                      onChange={(e) => setPhone(e.target.value)}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      required
                    />
                    <ErrorText className="text-xs form-text danger">
                      {error.messageErrorPhone}
                    </ErrorText>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Phòng ban
                    </label>
                    <input
                      type="text"
                      name="phong_ban"
                      value={phong_ban}
                      id="phong_ban"
                      onChange={(e) => setPhong_ban(e.target.value)}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      required
                    />
                    <ErrorText className="text-xs form-text danger">
                      {error.messageErrorPhongban}
                    </ErrorText>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Ngày sinh
                    </label>
                    <input
                      type="date"
                      name="birthday"
                      value={birthday}
                      id="birthday"
                      onChange={(e) => setBirthday(e.target.value)}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      required
                    />
                    <ErrorText className="text-xs form-text danger">
                      {error.messageErrorBirthday}
                    </ErrorText>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      required
                    />
                    <ErrorText className="text-xs form-text danger">
                      {error.messageErrorPassword}
                    </ErrorText>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      id="confirmPassword"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="category-create"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Chức vụ
                    </label>
                    <select
                      id="category-create"
                      onChange={(e) => {
                        setRoleName(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    >
                      <option selected=""></option>
                      {allRole.map((item, key) => {
                        return (
                          <option value={item.roleName} id={item.id} key={key}>
                            {item.roleName}
                          </option>
                        );
                      })}
                    </select>
                    <ErrorText className="text-xs form-text danger">
                      {error.messageErrorRole}
                    </ErrorText>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="category-create"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Quản lý
                    </label>
                    <select
                      id="category-create"
                      onChange={(e) => {
                        setManagerId(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    >
                      <option selected=""></option>
                      {searchUser.map((item, key) =>
                        item.role.id === 3 && item.status !== 0 ? (
                          <option
                            value={item.user.id}
                            id={item.user.id}
                            key={key}
                          >
                            {item.user.fullName}
                          </option>
                        ) : (
                          <></>
                        )
                      )}
                    </select>
                  </div>
                </div>
                <div className="items-center p-6 border-t border-gray-200 rounded-b ">
                  <button
                    className=" bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="button"
                    onClick={onClickRegister}
                  >
                    Thêm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default AccountManager;
