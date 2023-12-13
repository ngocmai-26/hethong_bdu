import { useEffect, useLayoutEffect, useState } from "react";

import LayoutAdmin from "../layout";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewKPICate,
  deleteKPICategories,
  getAllKPICategories,
  updateKPICategories,
} from "../../../thunks/KPICategoriesThunk";
import { data } from "autoprefixer";
import {
  setActionStatus,
  setSearchKPICategories,
} from "../../../slices/KPICategoriesSlice";
import { Link } from "react-router-dom";
import { setSearchKPIManager } from "../../../slices/KPIManagerSlice";
import { addNewKPIManager, deleteKPIManager, getAllKPIManager, updateKPIManager } from "../../../thunks/KPIManagerThunk";
import { getAllJob } from "../../../thunks/JobsThunk";

function KPIManager() {
  const [isHiddenUpdate, setIsHiddenUpdate] = useState(true);
  const [isHiddenCreate, setIsHiddenCreate] = useState(true);
  const [search, setSearch] = useState("");
  //Update
  const [kpiManagerDetail, setKpiManagerDetail] = useState({});
  const [kpiManager, setKpiManager] = useState({});

  
  const [updateKpiManagerName, setUpdateKpiManagerName] = useState("");
  const [updateKpiManagerDes, setUpdateKpiManagerDes] = useState("");
  const [updateKpiManagerTarget, setUpdateKpiManagerTarget] = useState(0);
  const [updateKpiManagerTypeId, setUpdateKpiManagerTypeId] = useState(0);
  const [updateKpiManagerJobId, setUpdateKpiManagerJobId] = useState("");


  //Lấy từ dispatch
  const { allKpiCategories } = useSelector(
    (state) => state.kpiCategoriesReducer
  );
  const { allKpiManager, searchKpiManager,actionStatusCode } = useSelector(
    (state) => state.kpiManagerReducer
  );
  const { allJob } = useSelector((state) => state.jobsReducer);

  //Các trường tạo dữ liệu
  const [kpiManagerName, setKpiManagerName] = useState("");
  const [kpiManagerDes, setKpiManagerDes] = useState("");
  const [kpiManagerTarget, setKpiManagerTarget] = useState(0);
  const [kpiManagerTypeId, setKpiManagerTypeId] = useState(0);
  const [kpiManagerJobId, setKpiManagerJobId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setKpiManager(kpiManagerDetail);
  }, [kpiManagerDetail]);

  const handleHiddenUpdate = (item) => {
    setIsHiddenUpdate(!isHiddenUpdate);
    setKpiManagerDetail(item);
  };
  
  console.log("item",kpiManagerDetail)
  const handleHiddenCreate = () => {
    setIsHiddenCreate(!isHiddenCreate);
  };

  //Tìm kiếm kpi
  useEffect(() => {
    const listSearchKpiManager = searchKpiManager?.filter((item) =>
      item?.kpiName?.toLowerCase().includes(search.toLowerCase())
    );
    if (listSearchKpiManager?.length !== 0) {
      dispatch(setSearchKPIManager(listSearchKpiManager));
    }
  }, [search]);


  //lấy ra danh mục kpi
  useLayoutEffect(() => {
    if (allKpiCategories.length <= 0) {
      dispatch(getAllKPICategories());
    } 
    if (allJob.length <= 0) {
      dispatch(getAllJob());
    } 
  }, []);

  //lấy ra các kpi
  useEffect(() => {
    if (allKpiManager.length <= 0) {
      dispatch(getAllKPIManager());
    }else {
        dispatch(setSearchKPIManager(allKpiManager));
      }
  }, [allKpiManager, dispatch]);

  useLayoutEffect(() => {
    setUpdateKpiManagerName(kpiManagerDetail?.kpiName);
    setUpdateKpiManagerDes(kpiManagerDetail?.description);
    setUpdateKpiManagerTypeId(kpiManagerDetail?.kpiCategory?.id);
    setUpdateKpiManagerJobId(kpiManagerDetail?.job?.id);
    setUpdateKpiManagerTarget(kpiManagerDetail?.target);
  }, [kpiManagerDetail]);

  console.log("updateKpiManagerJobId",updateKpiManagerJobId)

  const handleCreateKPIManager = () => {
    data = {
        kpiName: kpiManagerName,
      description: kpiManagerDes,
      kpiTypeId: kpiManagerTypeId,
      target :kpiManagerTarget,
      jobId: kpiManagerJobId,
      userId: "8f339945-7084-40a6-bddd-fd605686aa4b"
    };
    dispatch(addNewKPIManager(data));
  };

  const handleUpdateKPIManager = () => {
    const data = {
      id: kpiManager.id,
      kpiName: updateKpiManagerName,
      description: updateKpiManagerDes,
      kpiTypeId: updateKpiManagerTypeId,
      jobId: updateKpiManagerJobId,
      userId: "8f339945-7084-40a6-bddd-fd605686aa4b"
    };
    dispatch(updateKPIManager(data));
  };

  useEffect(() => {
    console.log(isHiddenUpdate);
    if (actionStatusCode === 200) {
      setIsHiddenCreate(true);
      setIsHiddenUpdate(true);

      setKpiManagerName("");
      setKpiManagerDes("");
      dispatch(setActionStatus(0));
    }
  }, [actionStatusCode]);

  console.log(allKpiManager)
  console.log("allKpiCategories",allKpiCategories)

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
                      Danh mục KPI
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Tất cả các KPI
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
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    placeholder="Tìm kiếm kpi"
                  />
                </div>
              </form>
            </div>
            <button
              type="button"
              id="createAccountButton"
              className="bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
              data-drawer-target="drawer-create-account-default"
              data-drawer-show="drawer-create-account-default"
              aria-controls="drawer-create-account-default"
              data-drawer-placement="right"
              onClick={() => handleHiddenCreate()}
            >
              Thêm kpi
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
                      Tên KPI
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
                      Chỉ tiêu
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Danh mục KPI
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
                  {searchKpiManager?.map((item, key) => {
                    return (
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
                          {item.kpiName}
                        </td>
                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                          {item.description}
                        </td>
                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                          {item.target}
                        </td>
                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                          {allKpiCategories.map((pre) => (pre.id === item.kpiCategory.id) ? (pre.name): (<></>))}
                        </td>

                        <td className="p-4 space-x-2 whitespace-nowrap">
                          <button
                            type="button"
                            id="updateaccountButton"
                            onClick={() => handleHiddenUpdate(item)}
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
                            id="deleteaccountButton"
                            onClick={() => {
                              if (window.confirm("confirm_delete")) {
                                dispatch(deleteKPIManager(item.id));
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
                            Xóa
                          </button>
                          <Link
                            to={`/kpis/${item?.id}`}
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
                      htmlFor="kpiName"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Tên kpi
                    </label>
                    <input
                      type="text"
                      name="kpiName"
                      onChange={(e) => {
                        setUpdateKpiManagerName(e.target.value);
                      }}
                      value={updateKpiManagerName}
                      id="kpiName"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="target"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Target
                    </label>
                    <input
                      type="text"
                      name="target"
                      onChange={(e) => {
                        setUpdateKpiManagerTarget(+e.target.value);
                      }}
                      value={updateKpiManagerTarget}
                      id="target"
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
                      onChange={(e) => {
                        setUpdateKpiManagerDes(e.target.value);
                      }}
                      value={updateKpiManagerDes}
                    ></textarea>
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="biography"
                      className="block  text-sm font-medium text-gray-900 "
                    >
                      Danh mục KPI : 
                    </label>
                    <span className="text-xs mb-2">Danh mục kpi hiện tại là :{allKpiCategories.map((item, key) => item.id === updateKpiManagerTypeId ? (item.name): (<></>) )}</span>
                    <select
                      id="category-create"
                      onChange={(e) => {
                        setUpdateKpiManagerTypeId(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    >
                      <option selected=""></option>
                      {allKpiCategories.map((item, key) => {
                        return (
                          <option value={item.id} id={item.id} key={key}>{item.name}</option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="biography"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Danh mục công việc
                    </label>
                    <span className="text-xs mb-2">Danh mục công việc hiện tại là :{allJob.map((item, key) => item.id === updateKpiManagerJobId ? (item.title): (<></>) )}</span>
                    <select
                      id="category-create"
                      onChange={(e) => {
                        setUpdateKpiManagerJobId(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    >
                      <option selected=""></option>
                      {allJob.map((item, key) => {
                        return (
                          <option value={item.id} id={item.id} key={key}>{item.title}</option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div className=" py-6 border-t border-gray-200 rounded-b flex justify-end  ">
                  <button
                    className="bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="button"
                    onClick={handleUpdateKPIManager}
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
              <h3 className="text-xl font-semibold">Thêm KPI mới</h3>
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
                      htmlFor="kpiName"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Tên kpi
                    </label>
                    <input
                      type="text"
                      name="kpiName"
                      onChange={(e) => {
                        setKpiManagerName(e.target.value);
                      }}
                      value={kpiManagerName}
                      id="kpiName"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="target"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Target
                    </label>
                    <input
                      type="text"
                      name="target"
                      onChange={(e) => {
                        setKpiManagerTarget(+e.target.value);
                      }}
                      value={kpiManagerTarget}
                      id="target"
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
                      onChange={(e) => {
                        setKpiManagerDes(e.target.value);
                      }}
                      value={kpiManagerDes}
                    ></textarea>
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="biography"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Danh mục KPI
                    </label>
                    <select
                      id="category-create"
                      onChange={(e) => {
                        setKpiManagerTypeId(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    >
                      <option selected=""></option>
                      {allKpiCategories.map((item, key) => {
                        return (
                          <option value={item.id} id={item.id} key={key}>{item.name}</option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="biography"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Danh mục công việc
                    </label>
                    <select
                      id="category-create"
                      onChange={(e) => {
                        setKpiManagerJobId(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    >
                      <option selected=""></option>
                      {allJob.map((item, key) => {
                        return (
                          <option value={item.id} id={item.id} key={key}>{item.title}</option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div className=" py-6 border-t border-gray-200 rounded-b flex justify-end  ">
                  <button
                    className="bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="button"
                    onClick={handleCreateKPIManager}
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

export default KPIManager;
