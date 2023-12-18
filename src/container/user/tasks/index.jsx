import { useEffect, useLayoutEffect, useState } from "react";
import {
  faAlignLeft,
  faBookBookmark,
  faBookReader,
  faCheck,
  faColumns,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Layout from "../layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllRole } from "../../../thunks/RoleThunk";
import {
  setActionStatus,
  setListJobRaz,
  setSearchJob,
} from "../../../slices/JobsSlice";
import { addNewJob, getAllJob } from "../../../thunks/JobsThunk";
import { priorities, statusList } from "../../../constants/fakedata";
import { getAllUser } from "../../../thunks/UserThunk";

function LayoutTask({ children }) {
  const role = JSON.parse(localStorage.getItem("auth_role"));
  const { allRole } = useSelector((state) => state.roleReducer);
  const { allJob, searchJobs, actionStatusCode, listJobRaz } = useSelector(
    (state) => state.jobsReducer
  );
  const { allUser } = useSelector((state) => state.userReducer);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState(0);
  const [filterPriority, setFilterPriority] = useState(0);
  const [changeReason, setChangeReason] = useState(0);
  const dispatch = useDispatch();
  const [state, setState] = useState([]);

  const [isHiddenCreate, setIsHiddenCreate] = useState(true);
  const handleHiddenCreate = () => {
    setIsHiddenCreate(!isHiddenCreate);
  };

  console.log("filterStatus", filterStatus);

  useEffect(() => {
    const listSearchJob = searchJobs.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    if (listSearchJob.length !== 0) {
      dispatch(setSearchJob(listSearchJob));
    }
  }, [search]);

  useEffect(() => {
    const listFilterStatus = allJob.filter((item) =>
      item.status === +filterStatus ? true : false
    );
    if (filterStatus === "0") {
      dispatch(setSearchJob(allJob));
    } else {
      dispatch(setSearchJob(listFilterStatus));
    }
  }, [filterStatus]);
  useEffect(() => {
    const listReason= allJob.filter((item) =>
      item.jobDetail.denyReason.length > 0
    );
    console.log("listReason", listReason)
    if (changeReason === "0") {
      dispatch(setSearchJob(allJob));
    } else {
      dispatch(setSearchJob(listReason));
    }
  }, [changeReason]);

  useEffect(() => {
    const listFilterPriority = allJob.filter((item) =>
      item.priority === +filterPriority ? true : false
    );
    if (filterStatus === "0") {
      dispatch(setSearchJob(allJob));
    } else {
      dispatch(setSearchJob(listFilterPriority));
    }
  }, [filterPriority]);

  useLayoutEffect(() => {
    if (allJob?.length <= 0) {
      dispatch(getAllJob());
    }
    if (allUser?.length <= 0) {
      dispatch(getAllUser());
    }
    if (allRole?.length <= 0) {
      dispatch(getAllRole());
    }
  }, []);

  useEffect(() => {
    if (allJob?.length > 0) {
      dispatch(setSearchJob(allJob));
    }
  }, [allJob]);

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
    dispatch(addNewJob(job)).then((resp) => {
      if (!resp?.error) {
        handleHiddenCreate(true);
        setJob({
          status: 1,
          kpi: 0,
          task: false,
        });
        setJobDetail({ note: "", denyReason: "", verifyLink: "" });
        setActionStatus(0);
      }
    });
    dispatch(setListJobRaz([...listJobRaz, job]));
  };

  const deleteJob = (item) => {
    const list = state.filter((e) => e !== item);
    setState(list);
  };

  return (
    <Layout>
      <div className="header-task ">
        <div className="title py-3">
          <a href="#" className="text-xl font-medium">
            Công việc
          </a>
        </div>

        <div className="tasks">
          <div className="block sm:flex bg-white mt-4 justify-between">
            <ul className="flex my-auto font-medium flex-row bg-white ">
              <li className="hover:bg-gray-50 mt-0 px-2">
                <Link
                  to="/task-list"
                  className="block py-1 text-sm font-medium leading-8 text-gray-500 w-full px-2 "
                >
                  <FontAwesomeIcon icon={faListCheck} className="me-1" />
                  Danh sách công việc
                </Link>
              </li>
              <li className="hover:bg-gray-50 mt-0 px-2">
                <Link
                  to="/task-board"
                  className="block py-1 text-sm font-medium leading-8 text-gray-500 w-full px-2 "
                >
                  <FontAwesomeIcon icon={faColumns} className="me-1" />
                  Bảng công việc
                </Link>
              </li>
              {role.id === 3 ? (
                <li className="hover:bg-gray-50 mt-0 px-2">
                  <Link
                    to="/quan-ly-bao-cao-cong-viec"
                    className="block py-1 text-sm font-medium leading-8 text-gray-500 w-full px-2 "
                  >
                    <FontAwesomeIcon icon={faAlignLeft} className="me-1" />
                    Báo cáo công việc
                  </Link>
                </li>
              ) : (
                <></>
              )}
            </ul>
            <form className="sm:pr-3 px-4 sm:px-0" action="#" method="GET">
              <label htmlFor="accounts-search" className="sr-only">
                Tìm kiếm
              </label>
              <div className="relative w-full  mt-1 sm:w-64 py-2">
                <input
                  type="text"
                  name="search"
                  id="accounts-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5"
                  placeholder="Tìm kiếm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="bg-gray-100 my-2 p-2 block sm:flex justify-between">
            <div className="flex sm:pb-0 pb-2">
              <div className="mx-2 sm:mx-4">
                <button
                  className="bg-gray-800 text-sm rounded-md text-white py-1 px-4"
                  onClick={() => handleHiddenCreate()}
                >
                  + Thêm mới
                </button>
              </div>
            </div>
            <div className="flex">
              <select
                id="category-create"
                onChange={(e) => setFilterStatus(e.target.value)}
                className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
              >
                <option selected="" value="0">
                  Trạng thái
                </option>
                {statusList.map((item, key) => (
                  <option value={item.id} key={key}>
                    {item.name}
                  </option>
                ))}
              </select>
              <select
                id="category-create"
                onChange={(e) => setFilterPriority(e.target.value)}
                className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
              >
                <option selected="" value="0">
                  Mức độ
                </option>
                {priorities.map((item, key) => (
                  <option value={item.id} key={key}>
                    {item.name}
                  </option>
                ))}
              </select>
              <select
                id="category-create"
                onChange={(e) => setChangeReason(e.target.value)}
                className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
              >
                <option selected="" value="0">
                  Tất cả công việc
                </option>
               
                <option selected="" value="1">
                  Công việc bị từ chối
                </option>
              </select>
            </div>
          </div>
          {children}
        </div>
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
                            value={jobDetail.description}
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
                            value={jobDetail.target}
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
                      <div className="max-h-64 overflow-y-auto overflow-hidden">
                        <div className="list-todo py-2">
                          <ul>
                            {state.map((item, key) => (
                              <li
                                key={key}
                                className="todo-item justify-between flex py-0.5 border-b-gray-200 border-b-2 mb-2 px-2"
                              >
                                <div>
                                  <div>
                                    <p className="text-xs font-bold">
                                      Công việc {item.stt}:{" "}
                                    </p>
                                    <p className="text-xs">{item.todo}</p>
                                  </div>
                                  <div>
                                    <span className="text-xs font-bold">
                                      Chỉ tiêu công việc:{" "}
                                    </span>
                                    <span className="text-xs">
                                      {item.target}
                                    </span>
                                  </div>
                                </div>
                                <span
                                  className="todo-exit cursor-pointer"
                                  onClick={() => deleteJob(item)}
                                >
                                  &times;
                                </span>
                              </li>
                            ))}
                          </ul>
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
                          {allUser.map((item) =>
                            item.status === 1 ? (
                              <button
                                type="button"
                                onClick={() =>
                                  setJob({
                                    ...job,
                                    staff: item?.user?.id,
                                  })
                                }
                                className={`users-item flex py-1 px-2 w-full text-left ${
                                  item.user.id === job?.staff
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
                            ) : (
                              <></>
                            )
                          )}
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
                            {allUser.map((item) =>
                              item.status === 1 ? (
                                <option value={item.user.id}>
                                  {item.user.fullName}
                                </option>
                              ) : (
                                <></>
                              )
                            )}
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
      </div>
    </Layout>
  );
}

export default LayoutTask;
