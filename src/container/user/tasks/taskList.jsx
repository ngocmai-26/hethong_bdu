import { useEffect, useLayoutEffect, useState } from "react";
import LayoutTask from ".";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllJob, updateJob } from "../../../thunks/JobsThunk";
import { priorities, statusList } from "../../../constants/fakedata";
import { setSearchJob } from "../../../slices/JobsSlice";


function TaskList() {
  const { allJob, searchJobs, staff, receiver } = useSelector((state) => state.jobsReducer);

  const [isAccept, setIsAccept] = useState(false);
  const [isRefuse, setIsRefuse] = useState(false);
  const [isHiddenCreate, setIsHiddenCreate] = useState(true);
  const [todo, setTodo] = useState("");
  const [target, setTarget] = useState(0);
  const [state, setState] = useState([]);
  const [isLink, setIsLink] = useState("");
  const [statusChange, setStatusChange] = useState({});
  const dispatch = useDispatch();

  const handleAccept = (item) => {
    console.log(item)
    setStatusChange(item)
    setIsAccept(!isAccept);
  };
  const handleRefuse = ({ item }) => {
    setIsRefuse(!isRefuse);
  };

  // useLayoutEffect(() => {
  //   if (allJob.length <= 0) {
  //     dispatch(getAllJob());
  //   }
  // }, []);

  useEffect(() => {
    if (allJob?.length <= 0) {
      dispatch(getAllJob());
    }else {
      dispatch(setSearchJob(allJob)); 
    }
  }, [allJob, dispatch])


  const handleSendAccept = () => {
    const updatedStatus = { ...statusChange, staff: staff, receiver:receiver, isTask: true };
    updatedStatus.status = 2
    setStatusChange(updatedStatus)
    
    console.log(updatedStatus)
    dispatch(updateJob(updatedStatus))
    setIsAccept(false);
    setIsRefuse(false);
  };
  const handleHiddenCreate = () => {
    setIsHiddenCreate(!isHiddenCreate);
  };

  const handleSubmit = () => {
    if (todo === "") {
      alert("Hãy nhập nội dung!");
    } else {
      setState([...state, { stt: state.length + 1, todo, isLink }]);
      setTodo("");
    }
  };

  const deleteJob = (item) => {
    const list = state.filter((e) => e !== item);
    setState(list);
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
                              className="bg-blue-600 h-1 rounded-full dark:bg-blue-500"
                              style={{ width: `${(10 / 50) * 100}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="w-fit p-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {item.status === 1 ? (
                            <button className="bg-blue-500 text-white text-xs p-1 mr-2" onClick={() => handleAccept(item)}>
                            Xác nhận
                          </button>
                          ) : (
                            <button
                              className="bg-blue-500 text-white text-xs p-1"
                              onClick={() => handleHiddenCreate()}
                            >
                              Báo cáo
                            </button>
                          )}
                        </td>
                        <td className=" text-sm font-medium text-gray-900 whitespace-nowrap"></td>
                      </tr>
                    );
                  })}
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
                        defaultValue=""
                        id="title"
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
                    type="submit"
                    onClick={() => handleSendAccept()}
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
                          <div className="text-right py-3">
                            <button
                              onClick={handleSubmit}
                              type="button"
                              className="btn-todo text-sm bg-green-300 text-white font-medium rounded-sm px-3 py-1 text-center"
                            >
                              Add
                            </button>
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
                              value={todo}
                              onChange={(e) => setTarget(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="list-todo py-2">
                      <ul>
                        {state.map((item, key) => (
                          <li
                            key={key}
                            className="todo-item justify-between flex py-0.5 border-b-gray-200 border-b-2 bg-green-100 mb-2 px-2"
                          >
                            <div>
                              <p className="text-sm font-bold">
                                Báo cáo lần {item.stt}:{" "}
                              </p>
                              <span className="text-sm">{item.todo}</span>
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

                <div className="items-center py-4 border-gray-200 rounded-b text-right">
                  <button
                    className=" bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-sm  text-sm px-5 py-1.5 text-center"
                    type="submit"
                  >
                    Save
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
