import { useLayoutEffect, useState } from "react";
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

function LayoutTask({ children }) {
  const role = JSON.parse(localStorage.getItem('auth_role'))
  const { allRole } = useSelector((state) => state.roleReducer);
  const dispatch = useDispatch();

  const [isHiddenCreate, setIsHiddenCreate] = useState(true);
  const handleHiddenCreate = () => {
    setIsHiddenCreate(!isHiddenCreate);
  };
  useLayoutEffect(() => {
    dispatch(getAllRole());
  }, []);

  const [todo, setTodo] = useState("");
  const [target, setTarget] = useState(0);
  const [state, setState] = useState([]);

  //Thêm jobs
  
  const [title, setTitle] = useState("");
  const [kpi, setKpi] = useState(0);
  const [priority, setPriority] = useState(0);
  const [status, setStatus] = useState(0);
  const [isTask, setIsTask] = useState(true);
  const [staff, setStaff] = useState("");
  const [receiver, setReceiver] = useState("");

  const handleSubmit = () => {
    if (todo === "") {
      alert("Hãy nhập nội dung!");
    } else {
      setState([...state, { stt: state.length + 1, target, todo }]);
      setTodo("");
      setTarget(0);
    }
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
              {role.id === 3? (
                <li className="hover:bg-gray-50 mt-0 px-2">
                <Link
                  to="/quan-ly-bao-cao-cong-viec"
                  className="block py-1 text-sm font-medium leading-8 text-gray-500 w-full px-2 "
                >
                  <FontAwesomeIcon icon={faAlignLeft} className="me-1" />
                  Báo cáo công việc
                </Link>
              </li>
              ): (<></>)}
              
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
                className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
              >
                <option selected="">Trạng thái</option>
                <option defaultValue="1">Ưu tiên cao</option>
                <option defaultValue="2">Ưu tiên trung bình</option>
                <option defaultValue="3">Ưu tiên thấp</option>
              </select>
              <select
                id="category-create"
                className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
              >
                <option selected="">Mức độ</option>
                <option defaultValue="FL">Cần gấp</option>
                <option defaultValue="RE">Quan trọng</option>
                <option defaultValue="AN">Bình thường</option>
                <option defaultValue="VU">Ưu tiên sau</option>
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
                          <div className="md:col-span-3 sm:col-span-2">
                            <label
                              htmlFor="category-create"
                              className="block mb-2 text-xs font-medium text-gray-900"
                            >
                              Trạng thái công việc
                            </label>
                            <select
                              id="category-create"
                              onChange={(e) => setState(e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                            >
                              <option selected=""></option>
                              <option value="1">Kế hoạch</option>
                              <option value="2">Đang tiến hành</option>
                              <option value="3">Đến hạn</option>
                              <option value="4">Hoàn thành</option>
                              
                            </select>
                          </div>
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
                                defaultValue=""
                                id="title"
                                className="shadow-sm bg-gray-50  border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                                required
                              />
                              <input
                                type="date"
                                name=""
                                defaultValue=""
                                id="title"
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
                          onChange={(e) => setTitle(e.target.value)}
                          defaultValue=""
                          id="title"
                          className="shadow-sm me-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5"
                          placeholder="Tên công việc"
                          required
                        />
                        <select
                          id="category-create"
                          onChange={(e)=>setPriority(+e.target.value)}
                          className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                        >
                          <option selected="">Mức độ</option>
                          <option value="1" >Cần gấp</option>
                          <option value="2">Quan trọng</option>
                          <option value="3">Bình thường</option>
                          <option value="4">Ưu tiên sau</option>
                        </select>
                      </div>
                      <div className="information-plan mt-2">
                        <div className="flex justify-between">
                          <textarea
                            className="input_todo w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-2"
                            value={todo}
                            rows="5"
                            placeholder="Danh sách công việc..."
                            onChange={(e) => setTodo(e.target.value)}
                          />
                          <input
                            type="number"
                            name="chitieu"
                            value={target}
                            id="chitieu"
                            className="shadow-sm ms-2 w-2/12 h-8 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5"
                            placeholder="Chỉ tiêu"
                            onChange={(e) => setTarget(e.target.value)}
                            required
                          />
                        </div>

                        <div className="text-right py-3">
                          <button
                            onClick={handleSubmit}
                            type="button"
                            className="btn-todo text-sm bg-green-300 text-white font-medium rounded-sm px-3 py-1 text-center"
                          >
                            Thêm
                          </button>
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
                          {allRole.filter((item) => item.roleName !== "ADMIN" && item.roleName !== "MANAGER" ? (
                            <div className="users-item flex py-1 px-2 ">
                            <div className="avatar w-2/12 ">
                              <img
                                src="https://batterydown.vn/wp-content/uploads/2022/05/hinh-anh-avatar-de-thuong-cute-nhat.jpg"
                                alt=""
                                className=" w-8 h-8  rounded-full"
                              />
                            </div>
                            <div className="name w-8/12 my-auto">
                              <span className="text-xs ">
                                Nguyễn Thị Ngọc Mai
                              </span>
                            </div>
                          </div>
                          ): (
                            <></>
                          ))}
                          
                        </div>
                      </div>
                      <span className="text-xs font-medium">
                        Người chịu trách nhiệm
                      </span>
                      <hr />
                      <div className="select-responsible">
                        <select
                          id="category-create"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5 w-full mt-2"
                        >
                          <option selected=""></option>
                          <option defaultValue="FL">Giảng viên</option>
                          <option defaultValue="RE">Nhân viên</option>
                          <option defaultValue="AN">Lãnh đạo khoa</option>
                          <option defaultValue="VU">Admin</option>
                        </select>
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
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block w-full p-1.5"
                          />
                        </div>
                        <span className="text-xs font-medium">Links</span>
                        <hr />
                        <div className="relative mt-1">
                          <select
                            id="category-create"
                            placeholder="Link with contact person"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm focus:ring-primary-500 focus:border-primary-500 block p-1.5 w-full mt-2"
                          >
                            <option selected="">Link liên lạc</option>
                            <option defaultValue="FL">Giảng viên</option>
                            <option defaultValue="RE">Nhân viên</option>
                            <option defaultValue="AN">Lãnh đạo khoa</option>
                            <option defaultValue="VU">Admin</option>
                          </select>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="items-center p-6 border-gray-200 rounded-b text-right">
                    <div class="flex items-center mb-4 justify-end">
                      <input
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        class="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500focus:ring-2"
                      />
                      <label
                        for="default-checkbox"
                        class="ms-2 text-xs font-medium text-gray-900 "
                      >
                        Lưu công việc
                      </label>
                    </div>
                    <button
                      className=" bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-sm  text-sm px-5 py-1.5 text-center"
                      type="submit"
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
