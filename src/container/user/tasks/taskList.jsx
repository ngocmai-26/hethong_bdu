import { useEffect, useLayoutEffect, useState } from "react";
import LayoutTask from ".";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllJob, updateJob } from "../../../thunks/JobsThunk";
import { priorities, statusList } from "../../../constants/fakedata";
import { setActionStatus, setSearchJob } from "../../../slices/JobsSlice";
import { setAlert } from "../../../slices/AlertSlice";
import { getAllUser } from "../../../thunks/UserThunk";

function TaskList() {
  const { allJob, searchJobs, listJobRaz, actionStatusCode } = useSelector(
    (state) => state.jobsReducer
  );

  const { allUser } = useSelector((state) => state.userReducer);
  const auth_role = JSON.parse(localStorage.getItem("auth_role"));
  const dispatch = useDispatch();

  const [jobUpdate, setJobUpdate] = useState({});
  const [jobDateUpdate, setJobDateUpdate] = useState({});
  const [jobDetailUpdate, setJobDetailUpdate] = useState({});
  const [isHiddenUpdate, setIsHiddenUpdate] = useState(true);
  const [isAccept, setIsAccept] = useState(false);
  const [isRefuse, setIsRefuse] = useState(false);
  const [isHiddenCreate, setIsHiddenCreate] = useState(true);
  const [todo, setTodo] = useState("");
  const [target, setTarget] = useState(0);
  const [isLink, setIsLink] = useState("");
  const [statusChange, setStatusChange] = useState({});
  const [report, setReport] = useState({});
  const [reason, setReason] = useState("");

  const handleAccept = (item) => {
    setStatusChange(item);
    setIsAccept(!isAccept);
  };
  const handleRefuse = ({ item }) => {
    setIsRefuse(!isRefuse);
  };

  useLayoutEffect(() => {
    if (allJob?.length <= 0) {
      dispatch(getAllJob());
    }
    if (allUser?.length <= 0) {
      dispatch(getAllUser());
    }
  }, []);

  useEffect(() => {
    if (allJob?.length > 0) {
      dispatch(setSearchJob(allJob));
    }
  }, [allJob, dispatch]);

  console.log(listJobRaz);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState(searchJobs);

  useEffect(() => {
    setCurrentData(
      searchJobs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    );
  }, []);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(searchJobs.length / itemsPerPage);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
    console.log(pageNumber);
    const newCurrentData = searchJobs.slice(
      (pageNumber - 1) * itemsPerPage,
      pageNumber * itemsPerPage
    );
    setCurrentData((prev) => (prev = newCurrentData));
  };

  const handleSendAccept = () => {
    const updatedStatus = {
      ...statusChange,
      staff: statusChange.staff.id,
      receiver: statusChange.receiver.id,
      task: true,
    };
    updatedStatus.status = 2;
    setStatusChange(updatedStatus);
    dispatch(updateJob(updatedStatus));
    setIsAccept(false);
    setIsRefuse(false);
  };

  const handleHiddenCreate = (item) => {
    setReport(item);
    setIsHiddenCreate(!isHiddenCreate);
  };

  const handleSubmit = () => {
    if (target <= report.jobDetail?.target) {
      const updated = {
        ...report,
        task: true,
        kpi: +target,
      };
      updated.jobDetail = {
        ...updated.jobDetail,
        note: todo,
        verifyLink: isLink,
      };
      setReport(updated);
      dispatch(updateJob(updated)).then((resp) => {
        if (!resp?.error) {
          setIsLink("");
          setTarget(0);
          setTodo("");
          setIsHiddenCreate(true);
        }
      });
    } else {
      dispatch(
        setAlert({
          type: "error",
          content: "Target hoàn thành không được lớn hơn chỉ tiêu đã đưa ra",
        })
      );
    }
  };

  //Update
  const handleHiddenUpdate = (item) => {
    setIsHiddenUpdate(!isHiddenUpdate);
    setJobDateUpdate(item);
  };

  useEffect(() => {
    setJobUpdate(jobDateUpdate);
    setJobDetailUpdate(jobDateUpdate?.jobDetail);
  }, [jobDateUpdate]);

  useEffect(() => {
    setJobUpdate({
      ...jobUpdate,
      jobDetail: jobDetailUpdate,
    });
  }, [jobDetailUpdate]);

  const handlUpdateJob = () => {
    dispatch(updateJob(jobUpdate));
  };

  const handleReason = () => {
    const updatedStatus = {
      ...statusChange,
      staff: statusChange?.staff?.id,
      receiver: statusChange?.receiver?.id ? statusChange?.receiver?.id : "",
      jobDetail: {
        ...statusChange.jobDetail,
        denyReason: reason,
      },
    };

    dispatch(updateJob(updatedStatus));
  };

  return (
    <LayoutTask>
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
                  {searchJobs?.map((item, key) =>
                    (item.jobDetail.denyReason.length === 0 &&
                      auth_role.id !== 3) ||
                    auth_role.id !== 1 ? (
                      <tr
                        className={`${
                          item.jobDetail.denyReason.length !== 0
                            ? "bg-red-300"
                            : ""
                        }`}
                        key={key}
                      >
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
                              className="bg-blue-600 h-1 rounded-full dark:bg-blue-500"
                              style={{
                                width: `${
                                  (item.kpi / item.jobDetail?.target) * 100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </td>
                        <td className="w-fit p-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {item.jobDetail.denyReason.length > 0 ? (
                            <button className="bg-blue-500 text-white text-xs p-1 mr-2">
                              Xem ly do
                            </button>
                          ) : item.status === 1? (
                            <button
                              className="bg-blue-500 text-white text-xs p-1 mr-2"
                              onClick={() => handleAccept(item)}
                            >
                              Xác nhận
                            </button>
                          ) : (
                            <button
                              className="bg-blue-500 text-white text-xs p-1 mr-2"
                              onClick={() => handleHiddenCreate(item)}
                            >
                              Báo cáo
                            </button>
                          )}
                          {auth_role.id === 3 && item.jobDetail.denyReason.length === 0 ? (
                            <button
                              className="bg-blue-500 text-white text-xs p-1 "
                              onClick={() => handleHiddenUpdate(item)}
                            >
                              Cập nhật
                            </button>
                          ) : (
                            <></>
                          )}
                        </td>
                      </tr>
                    ) : (
                      <></>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Slide */}
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
            <span className="font-semibold text-gray-900">1-20</span> of{" "}
            <span className="font-semibold text-gray-900">2290</span>
          </span>
        </div>
      </div>

      {/* Xác nhận */}
      <div
        className={`fixed ${
          isAccept && !isRefuse ? "fixed" : "hidden"
        } left-0 right-0 z-50 items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full`}
        id="delete-user-modal"
      >
        <div className="relative w-full h-full max-w-md px-4 md:h-auto m-auto ">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                data-modal-toggle="delete-user-modal"
                onClick={handleAccept}
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

            <div className="p-6 pt-0 text-center">
              <svg
                className="w-12 h-12 mx-auto text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="11"
                  fill="none"
                  stroke="text-blue-500"
                  strokeWidth="2"
                ></circle>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <h3 className="mt-5 mb-6 text-lg text-gray-500 ">
                Bạn xác nhận công việc?
              </h3>
              <button
                onClick={() => handleSendAccept()}
                href="#"
                className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 "
              >
                Xác nhận
              </button>
              <button
                className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                data-modal-toggle="delete-user-modal"
                onClick={(item) => handleRefuse(item)}
              >
                Từ chối
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Từ chối */}
      <div
        className={`fixed ${
          isRefuse ? "fixed" : "hidden"
        } left-0 right-0 z-50 items-center justify-center  overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full`}
        id="new-task-modal"
      >
        <div className="relative w-full h-full max-w-xl m-auto px-4 md:h-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-start justify-between p-5 border-b rounded-t ">
              <h3 className="text-xl font-semibold">Lý do từ chối</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                data-modal-toggle="add-user-modal"
                onClick={(item) => handleRefuse(item)}
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
                <div className="grid grid-cols-1 ">
                  <div className="md:col-span-2 ">
                    <div className="information-plan mt-2">
                      <input
                        type="text"
                        name="title"
                        value={reason}
                        id="title"
                        onChange={(e) => setReason(e.target.value)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        placeholder="Lý do từ chối"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="items-center py-4 border-gray-200 rounded-b text-right">
                  <button
                    className=" bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-sm  text-sm px-5 py-1.5 text-center"
                    type="button"
                    onClick={() => handleReason()}
                  >
                    Gửi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Báo cáo */}
      <div
        className={`fixed left-0 right-0 z-50 items-center justify-center ${
          isHiddenCreate ? "hidden" : "flex"
        } overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full`}
        id="new-task-modal"
      >
        <div className="relative w-full h-full max-w-5xl m-auto px-4 md:h-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-start justify-between p-5 border-b rounded-t ">
              <h3 className="text-xl font-semibold">
                Báo cáo tiến độ công việc
              </h3>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                  <div className="">
                    <div className="grid grid-cols-1 ">
                      <div className="md:col-span-2 ">
                        <div className="information-plan mt-2">
                          <div className="flex justify-between">
                            <textarea
                              className="input_todo w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-2"
                              value={todo}
                              rows="7"
                              placeholder="Công việc đã hoàn thành"
                              onChange={(e) => setTodo(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="information-plan mt-2">
                          <div className="">
                            <label htmlFor="mucdo" className="text-xs">
                              Đường dẫn tải liệu báo cáo
                            </label>
                            <input
                              id="mucdo"
                              type="text"
                              className="input_todo shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 w-full block p-2"
                              value={isLink}
                              onChange={(e) => setIsLink(e.target.value)}
                            />
                          </div>
                          <div className="">
                            <label htmlFor="mucdo" className="text-xs">
                              Cập nhật mức độ hoàn thành
                            </label>
                            <input
                              id="mucdo"
                              type="number"
                              className="input_todo shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-2"
                              value={target}
                              onChange={(e) => setTarget(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="items-center py-4 border-gray-200 rounded-b text-right">
                  <button
                    className=" bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-sm  text-sm px-5 py-1.5 text-center"
                    type="button"
                    onClick={() => handleSubmit()}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
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
                              target: +e.target.value,
                            })
                          }
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
                      <div className="h-auto "></div>
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
                          {/* {allUser.map((item) => (
                            <option value={item.user.id}>
                              {item.user.fullName}
                            </option>
                          ))} */}
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
    </LayoutTask>
  );
}

export default TaskList;
