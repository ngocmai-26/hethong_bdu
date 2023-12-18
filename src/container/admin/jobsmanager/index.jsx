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
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addNewJob,
  deleteJob,
  getAllJob,
  updateJob,
} from "../../../thunks/JobsThunk";
import { setListJobRaz, setReceiver, setSearchJob, setStaff } from "../../../slices/JobsSlice";
import { priorities, statusList } from "../../../constants/fakedata";
import { setAlert } from "../../../slices/AlertSlice";

function AdminJobManager() {
  const { allJob, searchJobs, listJobRaz, actionStatusCode } = useSelector(
    (state) => state.jobsReducer
  );
  const { allUser } = useSelector((state) => state.userReducer);
  const [search, setSearch] = useState("");

  const [jobUpdate, setJobUpdate] = useState({});
  const [jobDateUpdate, setJobDateUpdate] = useState({});
  const [jobDetailUpdate, setJobDetailUpdate] = useState({});

  const dispatch = useDispatch();

  const [isHiddenCreate, setIsHiddenCreate] = useState(true);
  const [isHiddenUpdate, setIsHiddenUpdate] = useState(true);
  const handleHiddenCreate = () => {
    setIsHiddenCreate(!isHiddenCreate);
  };

  useLayoutEffect(() => {
    if (allJob?.length <= 0) {
      dispatch(getAllJob());
    }
  }, []);

  useEffect(() => {
    if (allJob?.length > 0) {
      dispatch(setSearchJob(allJob));
    }
  }, [allJob, dispatch]);

  useEffect(() => {
    const listSearchJob = allJob?.filter((item) =>
      item?.title?.toLowerCase().includes(search.toLowerCase())
    );
    if (listSearchJob?.length !== 0) {
      dispatch(setSearchJob(listSearchJob));
    }
  }, [search]);

  //Thêm jobs
  const [jobDetail, setJobDetail] = useState({
    note: "",
    denyReason: "",
    verifyLink: "",
  });
  const [job, setJob] = useState({
    status: 1,
    kpi: 0,
    task: false,
  });

  const handleCreateJob = () => {
    setJob({
      ...job,
      kpi: 0,
      task: false,
      jobDetail: jobDetail,
    });
    dispatch(addNewJob(job));
    dispatch(setListJobRaz([...listJobRaz, job]));
  };



  //Update
  const handleHiddenUpdate = (item) => {
    setIsHiddenUpdate(!isHiddenUpdate);
    setJobDateUpdate(item)
  };

  useEffect(()=> {
    setJobUpdate(jobDateUpdate);
    setJobDetailUpdate(jobDateUpdate?.jobDetail);
  }, [jobDateUpdate])

  useEffect(() => {
    setJobUpdate({
      ...jobUpdate,
      jobDetail: jobDetailUpdate,
    });
  }, [jobDetailUpdate])

  const handlUpdateJob = () => {
    dispatch(updateJob(jobUpdate))
  };

  useEffect(() => {
    if (actionStatusCode >= 200 && actionStatusCode <= 201) {
      handleHiddenCreate(true);
      handleHiddenUpdate(true)
      setJobDetailUpdate({})
      setJobUpdate({})
      setJob({
        status: 1,
        kpi: 0,
        task: false,
      });
      setJobDetail({ note: "", denyReason: "", verifyLink: "" });
      setActionStatus(0);
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
                      Danh mục KPI
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Tất cả công việc
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
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    name="email"
                    id="accounts-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    placeholder="Tìm kiếm danh mục kpi"
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
              Thêm công việc
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-white border-b">
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
                          Trạng thái
                        </label>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Trạng thái
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Mức độ
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Công việc
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Ngày bắt đầu
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Tiến độ
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Hành động
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-medium text-left text-gray-500 uppercase"
                    ></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {searchJobs.map((item, key) => {
                    return (
                      <tr className="" key={key}>
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
                          <div className="text-xs font-medium text-gray-900">
                            {statusList.map((pre, key) =>
                              pre.id === item.status ? (
                                <span
                                  className={`${pre.bg_color} text-center rounded-sm text-white py-1 px-3 cursor-pointer`}
                                  key={key}
                                >
                                  <span>{pre.name}</span>
                                </span>
                              ) : (
                                <></>
                              )
                            )}

                            <div></div>
                          </div>
                        </td>
                        <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {priorities.map((pre, key) =>
                            pre.id === item.priority ? (
                              <FontAwesomeIcon
                                icon={faCheck}
                                className={`${pre.color} font-bold text-base`}
                                key={key}
                              />
                            ) : (
                              <></>
                            )
                          )}
                        </td>
                        <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs">
                          <Link to={`/jobs/${item.id}`} className="underline">
                            {item.title}
                          </Link>
                        </td>
                        <td className="p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                          10/11/2023
                        </td>
                        <td className="p-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                          <div className="w-full bg-gray-200 rounded-full h-1 my-2 dark:bg-gray-700">
                            <div
                              className="bg-blue-600 h-1 rounded-full dark:bg-blue-500 w-max-full"
                              style={{
                                width: `${
                                  (item.kpi / item.jobDetail.target) * 100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </td>
                        <td className="w-fit p-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                          <button
                            className="bg-red-500 text-white text-xs p-1 mr-2"
                            onClick={() => {
                              if (
                                window.confirm("Bạn có muốn xóa công việc này")
                              ) {
                                dispatch(deleteJob(String(item.id)));
                              }
                            }}
                          >
                            Xóa
                          </button>
                          <button
                            className="bg-blue-500 text-white text-xs p-1"
                            onClick={() => handleHiddenUpdate(item)}
                          >
                            Cập nhật
                          </button>
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
        id="new-task-modal"
      >
        <div className="relative w-full h-full max-w-6xl m-auto px-4 md:h-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-start justify-between p-5 border-b rounded-t ">
              <h3 className="text-xl font-semibold">Thêm công việc</h3>
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
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full">
                  <div className="md:col-span-2 ">
                    <div className="due">
                      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-3 justify-between">
                        <div className="col-span-2">
                          <label
                            htmlFor="category-create"
                            className="block mb-2 text-xs font-medium text-gray-900 "
                          >
                            Khung thời gian
                          </label>
                          <span className="text-xs text-red-700">
                            Chọn khung thời gian mới nếu như bạn có thay đổi
                          </span>
                          <div className="grid grid-cols-2">
                            <input
                              type="date"
                              name=""
                              value={jobDetailUpdate?.timeStart}
                              onChange={(e) =>
                                setJobDetailUpdate({
                                  ...jobDetailUpdate,
                                  timeStart:
                                    e.target.value === null
                                      ? jobDetailUpdate?.timeStart
                                      : e.target.value,
                                })
                              }
                              id="timeStart"
                              className="shadow-sm bg-gray-50  border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                              required
                            />
                            <input
                              type="date"
                              name=""
                              value={jobDetailUpdate?.timeEnd}
                              onChange={(e) =>
                                setJobDetailUpdate({
                                  ...jobDetailUpdate,
                                  timeEnd:
                                    e.target.value === null
                                      ? jobDetailUpdate?.timeEnd
                                      : e.target.value,
                                })
                              }
                              id="timeEnd"
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="information-plan mt-2 flex">
                      <input
                        type="text"
                        name="title"
                        value={jobUpdate?.title}
                        onChange={(e) =>
                          setJobUpdate({
                            ...jobUpdate,
                            title: e.target.value,
                          })
                        }
                        id="title"
                        className="shadow-sm me-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5"
                        placeholder="Tên công việc"
                        required
                      />
                      <select
                        id="category-create"
                        value={jobUpdate?.priority}
                        onChange={(e) =>
                          setJobUpdate({
                            ...jobUpdate,
                            priority: +e.target.value,
                          })
                        }
                        className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                      >
                        <option selected="">Mức độ</option>
                        <option value="1">Cần gấp</option>
                        <option value="2">Quan trọng</option>
                        <option value="3">Bình thường</option>
                        <option value="4">Ưu tiên sau</option>
                      </select>
                    </div>
                    <div className="information-plan mt-2">
                      <div className="flex justify-between">
                        <textarea
                          className="input_todo w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-2"
                          value={jobDetailUpdate?.description}
                          rows="5"
                          placeholder="Mô tả công việc"
                          onChange={(e) =>
                            setJobDetailUpdate({
                              ...jobDetailUpdate,
                              description: e.target.value,
                            })
                          }
                        />
                        <input
                          type="number"
                          name="chitieu"
                          value={jobDetailUpdate?.target}
                          id="chitieu"
                          className="shadow-sm ms-2 w-2/12 h-8 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                          placeholder="Chỉ tiêu"
                          onChange={(e) =>
                            setJobDetailUpdate({
                              ...jobDetailUpdate,
                              target: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="h-full">
                    <span className="text-xs font-medium">Phân công</span>
                    <hr />
                    <form action="#" method="GET" className="">
                      <label htmlFor="top-bar-search" className="sr-only">
                        Tìm kiếm
                      </label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-500 "
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="email"
                          id="top-bar-search"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-1.5"
                          placeholder="Tìm kiếm"
                        />
                      </div>
                    </form>
                    <div className="users-selection-list-wrapper py-2 h-72 overscroll-y-none overflow-y-auto overflow-hidden">
                      <div className="h-auto ">
                        {allUser.map((item) => (
                          <button
                            type="button"
                            onClick={(e) =>
                              setJobUpdate({
                                ...jobUpdate,
                                staff: item?.user?.id,
                              })
                            }
                            className={`users-item flex py-1 px-2 w-full text-left ${
                              item.user.id === jobUpdate?.staff
                                ? "bg-gray-300"
                                : ""
                            }`}
                          >
                            <div className="avatar w-2/12 ">
                              <img
                                src="https://batterydown.vn/wp-content/uploads/2022/05/hinh-anh-avatar-de-thuong-cute-nhat.jpg"
                                alt=""
                                className=" w-8 h-8  rounded-full"
                              />
                            </div>
                            <div className="name w-8/12 my-auto">
                              <span className="text-xs ">
                                {item.user.fullName}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="h-full">
                    <form action="#" method="GET" className="">
                      <span className="text-xs font-medium">
                        Đường dẫn File
                      </span>
                      <hr />
                      <div className="relative mt-1">
                        <input
                          type="text"
                          name="file"
                          id="top-bar-search"
                          value={jobDetailUpdate?.additionInfo}
                          onChange={(e) =>
                            setJobDetailUpdate({
                              ...jobDetailUpdate,
                              additionInfo: e.target.value,
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5"
                        />
                      </div>
                      <span className="text-xs font-medium">
                        Người chịu trách nhiệm
                      </span>
                      <hr />
                      <div className="select-responsible">
                        <select
                          id="category-create"
                          onChange={(e) =>
                            setJobUpdate({
                              ...jobUpdate,
                              receiver: e.target.value,
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5 w-full mt-2"
                        >
                          <option selected=""></option>
                          {allUser.map((item) => (
                            <option value={item.user.id}>
                              {item.user.fullName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="items-center p-6 border-gray-200 rounded-b text-right">
                  <div className="flex items-center mb-4 justify-end">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500focus:ring-2"
                    />
                    <label
                      for="default-checkbox"
                      className="ms-2 text-xs font-medium text-gray-900 "
                    >
                      Lưu công việc
                    </label>
                  </div>
                  <button
                    className=" bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-sm  text-sm px-5 py-1.5 text-center"
                    type="button"
                    onClick={handlUpdateJob}
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
        id="new-task-modal"
      >
        <div className="relative w-full h-full max-w-6xl m-auto px-4 md:h-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-start justify-between p-5 border-b rounded-t ">
              <h3 className="text-xl font-semibold">Thêm công việc</h3>
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
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full">
                  <div className="md:col-span-2 ">
                    <div className="due">
                      <div className="grid grid-cols-1 md:grid-cols-5 sm:grid-cols-4 justify-between">
                        <div className="col-span-2">
                          <label
                            htmlFor="category-create"
                            className="block mb-2 text-xs font-medium text-gray-900 "
                          >
                            Khung thời gian
                          </label>
                          <div className="grid grid-cols-2">
                            <input
                              type="date"
                              name=""
                              value={jobDetail?.timeStart}
                              onChange={(e) =>
                                setJobDetail({
                                  ...jobDetail,
                                  timeStart: e.target.value,
                                })
                              }
                              id="timeStart"
                              className="shadow-sm bg-gray-50  border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                              required
                            />
                            <input
                              type="date"
                              name=""
                              value={jobDetail?.timeEnd}
                              onChange={(e) =>
                                setJobDetail({
                                  ...jobDetail,
                                  timeEnd: e.target.value,
                                })
                              }
                              id="timeEnd"
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="information-plan mt-2 flex">
                      <input
                        type="text"
                        name="title"
                        value={job?.title}
                        onChange={(e) =>
                          setJob({
                            ...job,
                            title: e.target.value,
                          })
                        }
                        id="title"
                        className="shadow-sm me-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5"
                        placeholder="Tên công việc"
                        required
                      />
                      <select
                        id="category-create"
                        value={job?.priority}
                        onChange={(e) =>
                          setJob({
                            ...job,
                            priority: +e.target.value,
                          })
                        }
                        className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                      >
                        <option selected="">Mức độ</option>
                        <option value="1">Cần gấp</option>
                        <option value="2">Quan trọng</option>
                        <option value="3">Bình thường</option>
                        <option value="4">Ưu tiên sau</option>
                      </select>
                    </div>
                    <div className="information-plan mt-2">
                      <div className="flex justify-between">
                        <textarea
                          className="input_todo w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-2"
                          value={jobDetail?.description}
                          rows="5"
                          placeholder="Mô tả công việc"
                          onChange={(e) =>
                            setJobDetail({
                              ...jobDetail,
                              description: e.target.value,
                            })
                          }
                        />
                        <input
                          type="number"
                          name="chitieu"
                          value={jobDetail?.target}
                          id="chitieu"
                          className="shadow-sm ms-2 w-2/12 h-8 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                          placeholder="Chỉ tiêu"
                          onChange={(e) =>
                            setJobDetail({
                              ...jobDetail,
                              target: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="h-full">
                    <span className="text-xs font-medium">Phân công</span>
                    <hr />
                    <form action="#" method="GET" className="">
                      <label htmlFor="top-bar-search" className="sr-only">
                        Tìm kiếm
                      </label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-500 "
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="email"
                          id="top-bar-search"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-1.5"
                          placeholder="Tìm kiếm"
                        />
                      </div>
                    </form>
                    <div className="users-selection-list-wrapper py-2 h-72 overscroll-y-none overflow-y-auto overflow-hidden">
                      <div className="h-auto ">
                        {allUser.map((item) => (
                          <button
                            type="button"
                            onClick={(e) =>
                              setJob({
                                ...job,
                                staff: item?.user?.id,
                              })
                            }
                            className={`users-item flex py-1 px-2 w-full text-left ${
                              item.user.id === job?.staff ? "bg-gray-300" : ""
                            }`}
                          >
                            <div className="avatar w-2/12 ">
                              <img
                                src="https://batterydown.vn/wp-content/uploads/2022/05/hinh-anh-avatar-de-thuong-cute-nhat.jpg"
                                alt=""
                                className=" w-8 h-8  rounded-full"
                              />
                            </div>
                            <div className="name w-8/12 my-auto">
                              <span className="text-xs ">
                                {item.user.fullName}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="h-full">
                    <form action="#" method="GET" className="">
                      <span className="text-xs font-medium">
                        Đường dẫn File
                      </span>
                      <hr />
                      <div className="relative mt-1">
                        <input
                          type="text"
                          name="file"
                          id="top-bar-search"
                          value={jobDetail?.additionInfo}
                          onChange={(e) =>
                            setJobDetail({
                              ...jobDetail,
                              additionInfo: e.target.value,
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5"
                        />
                      </div>
                      <span className="text-xs font-medium">
                        Người chịu trách nhiệm
                      </span>
                      <hr />
                      <div className="select-responsible">
                        <select
                          id="category-create"
                          onChange={(e) =>
                            setJob({
                              ...job,
                              receiver: e.target.value,
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5 w-full mt-2"
                        >
                          <option selected=""></option>
                          {allUser.map((item) => (
                            <option value={item.user.id}>
                              {item.user.fullName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="items-center p-6 border-gray-200 rounded-b text-right">
                  <div className="flex items-center mb-4 justify-end">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500focus:ring-2"
                    />
                    <label
                      for="default-checkbox"
                      className="ms-2 text-xs font-medium text-gray-900 "
                    >
                      Lưu công việc
                    </label>
                  </div>
                  <button
                    className=" bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-sm  text-sm px-5 py-1.5 text-center"
                    type="button"
                    onClick={handleCreateJob}
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

export default AdminJobManager;
