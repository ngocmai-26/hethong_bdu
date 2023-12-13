import { useEffect, useLayoutEffect, useState } from "react";

import LayoutAdmin from "../layout";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRole,
  deleteRole,
  updateRole,
  updatePermission,
  addNewRole,
} from "../../../thunks/RoleThunk";
import { Link } from "react-router-dom";
import { setAlert } from "../../../slices/AlertSlice";
import { getAllPermissions } from "../../../thunks/PermissionsThunk";
import { setActionStatus, setSearchRole } from "../../../slices/RoleSlice";

function CategoryTarget() {

  const [isHiddenUpdate, setIsHiddenUpdate] = useState(true);
  const [isHiddenPer, setIsHiddenPer] = useState(true);
  const [isHiddenCreate, setIsHiddenCreate] = useState(true);
  const [roleDetail, setRoleDetail] = useState({});
  const [taskList, setTaskList] = useState([]);
  const [role, setRole] = useState({});
  const [perUpdate, setPerUpdate] = useState({});
  const [search, setSearch] = useState("");
  
  //update
  const [updateRoleName, setUpdateRoleName] = useState("");
  const [updateRoleDes, setUpdateRoleDes] = useState("");

  //create
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDes, setNewRoleDes] = useState("");

  const { allRole, actionStatusCode, searchRole } = useSelector((state) => state.roleReducer);
  const { allPermission } = useSelector((state) => state.permissionsReducer);
  
  const dispatch = useDispatch();


  const handleCreateRole = () => {
    const data = {
      id: allRole.length + 1,
      roleName: newRoleName,
      description: newRoleDes,
      permissionIds: [],
      kpiCategoryIds: [],
    };
    dispatch(addNewRole(data));
  };

  useEffect(() => {
    setRole(roleDetail);
  }, [roleDetail]);

  const handleAddTaskList = (item) => {
    if (!taskList.includes(item)) {
      setTaskList([...taskList, item]);
    }
  };

  const handleHiddenUpdate = (item) => {
    setIsHiddenUpdate(!isHiddenUpdate);
    setRoleDetail(item);
  };

  const handleHiddenCreate = () => {
    setIsHiddenCreate(!isHiddenCreate);
    setTaskList(taskList);
  };

  useEffect(() => {
    dispatch(getAllRole());
  }, [taskList]);

  const handleHiddenPer = (item) => {
    setIsHiddenPer(!isHiddenPer);
    const foundItem = allRole.find((pre) => pre?.id === item?.id);
    if (foundItem) {
      const newIdsArray = foundItem.permissions.map((perItem) => perItem?.id);
      setTaskList(newIdsArray);
    }
    setPerUpdate(item);
  };
  useEffect(() => {
    const listSearchRole = allRole?.filter((item) => item?.roleName?.toLowerCase().includes(search.toLowerCase()))
    if (listSearchRole?.length !==0) {
      dispatch(setSearchRole(listSearchRole));
    }
  }, [search])

  useLayoutEffect(() => {
    if (allPermission.length <= 0) {
      dispatch(getAllPermissions());
    }
  }, []);

  useEffect(() => {
    if (allRole?.length <= 0) {
      dispatch(getAllRole());
    }else {
      dispatch(setSearchRole(allRole)); 
    }
  }, [allRole, dispatch])


  useLayoutEffect(() => {
    setUpdateRoleDes(roleDetail?.description);
    setUpdateRoleName(roleDetail?.roleName);
  }, [roleDetail]);

  const handleUpdateRole = () => {
    const data = {
      id: role.id,
      roleName: updateRoleName,
      description: updateRoleDes,
    };
    dispatch(updateRole(data));
    setIsHiddenUpdate(!isHiddenUpdate);
    console.log(data);
  };

  const handleUpdatePer = () => {
    const data = {
      id: perUpdate.id,
      permissionIds: taskList,
    };
    dispatch(updatePermission(data));
  };
  useEffect(() => {
    if (actionStatusCode === 200) {
      console.log("actionStatusCode", actionStatusCode);
      setIsHiddenCreate(true);
      setIsHiddenPer(true);
      setNewRoleName("");
      setNewRoleDes("");
      dispatch(setActionStatus(0));
    }
  }, [actionStatusCode]);

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
                      Danh mục chức vụ
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Tất cả các chức vụ
            </h1>
          </div>
          <div className="items-center justify-between flex md:divide-x md:divide-gray-100 ">
            <div className="flex items-center mb-0">
              <form className="sm:pr-3" action="#" method="GET">
                <label htmlFor="accounts-search" className="sr-only">
                  Tìm kiếm
                </label>
                <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                  <input
                    type="text"
                    name="email"
                    id="accounts-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    placeholder="Tìm kiếm chức vụ"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <button
              type="button"
              id="createAccountButton"
              className="bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={handleHiddenCreate}
            >
              Thêm chức vụ
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
                      Tên chức vụ
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Mô tả
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
                  {searchRole?.map((item, index) => {
                    return (
                      <tr className="hover:bg-gray-100" key={index}>
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
                            {item?.id}
                          </div>
                        </td>
                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                          {item?.roleName}
                        </td>
                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                          {item?.description}
                        </td>

                        <td className="p-4 space-x-2 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleHiddenUpdate(item)}
                            className="bg-blue-500 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
                          >
                            Chỉnh sửa
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm("confirm_delete")) {
                                dispatch(deleteRole(item.id));
                              }
                            }}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300"
                          >
                            Xóa
                          </button>
                          <button
                            type="button"
                            onClick={() => handleHiddenPer(item)}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300"
                          >
                            Phân quyền
                          </button>
                          <Link
                            to={`/roles/${item.id}`}
                            type="button"
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300"
                          >
                            Xem chi tiết
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
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
        id="edit-user-modal"
      >
        <div className="relative w-full h-full max-w-2xl px-4 md:h-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-start justify-between p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold ">Chỉnh sửa kpi</h3>
              <button
                type="button"
                onClick={() => handleHiddenUpdate()}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="edit-user-modal"
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
                      Tên chức vụ
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      onChange={(e) => setUpdateRoleName(e.target.value)}
                      defaultValue={updateRoleName}
                      id="full-name"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      required
                    />
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="biography"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Mô tả
                    </label>
                    <textarea
                      id="biography"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                      onChange={(e) => setUpdateRoleDes(e.target.value)}
                      defaultValue={updateRoleDes}
                    ></textarea>
                  </div>
                </div>
                <div className=" py-6 border-t border-gray-200 rounded-b flex justify-end  ">
                  <button
                    className="bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="button"
                    onClick={handleUpdateRole}
                  >
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* update phân quyền */}
      <div
        className={`fixed left-0 right-0 z-50 items-center justify-center ${
          isHiddenPer ? "hidden" : "flex"
        } overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full`}
        id="add-user-modal"
      >
        <div className="relative w-full h-full max-w-2xl m-auto px-4 md:h-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-start justify-between p-5 border-b rounded-t ">
              <h3 className="text-xl font-semibold">Thêm chức vụ</h3>
              <button
                type="button"
                onClick={() => handleHiddenPer()}
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
                      Tên chức vụ
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      value={perUpdate?.roleName}
                      disabled
                      id="full-name"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      placeholder="Bonnie"
                      required
                    />
                  </div>
                  <div className="col-span-6">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="">
                        <span className="text-xs font-medium">
                          Lựa chọn quyền
                        </span>
                        <div className="border-2 h-40 overflow-y-auto overflow-hidden">
                          <ul>
                            {allPermission?.response?.map((item, key) => (
                              <li className="hover:bg-gray-100" key={key}>
                                <button
                                  className="w-full text-start text-xs p-1"
                                  onClick={() => handleAddTaskList(item.id)}
                                  type="button"
                                >
                                  {item.permissionName}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="">
                        <span className="text-xs font-medium">Quyền hạn</span>
                        <div className="border-2 h-40 overflow-y-auto overflow-hidden">
                          <ul>
                            {allPermission?.response?.map((pre, key) =>
                              taskList?.map((item) =>
                                pre.id === item ? (
                                  <li className="text-xs p-1 flex justify-between" key={key}>
                                    {pre.permissionName}
                                  </li>
                                ) : (
                                  <li></li>
                                )
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="biography"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Mô tả
                    </label>
                    <textarea
                      id="biography"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                      value={perUpdate?.description}
                      disabled
                    ></textarea>
                  </div>
                </div>
                <div className=" py-6 border-t border-gray-200 rounded-b flex justify-end  ">
                  <button
                    className="bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="button"
                    onClick={handleUpdatePer}
                  >
                    Lưu
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
              <h3 className="text-xl font-semibold">Thêm chức vụ</h3>
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
                      Tên chức vụ
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      value={newRoleName}
                      onChange={(e) => {
                        setNewRoleName(e.target.value);
                      }}
                      id="roleName"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      required
                    />
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="biography"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Mô tả
                    </label>
                    <textarea
                      id="biography"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                      value={newRoleDes}
                      onChange={(e) => {
                        setNewRoleDes(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
                <div className=" py-6 border-t border-gray-200 rounded-b flex justify-end  ">
                  <button
                    className="bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="button"
                    onClick={handleCreateRole}
                  >
                    Lưu
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

export default CategoryTarget;
