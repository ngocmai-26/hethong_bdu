import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../../../asset/img/NTNM.png";
import { logout } from "../../../slices/AuthSlice";
import { useDispatch } from "react-redux";

function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  
  const dispatch = useDispatch();
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <header className="bg-white w-ful fixed top-0 z-50 right-0 left-0">
      <nav
        className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 "
        id="navbar-menu"
      >
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex w-full sm:w-auto my-3">
            <img
              src={avatar}
              className="mx-auto sm:mr-3"
              alt="Flowbite Logo "
            />
          </Link>
          <div className="flex items-center w-full sm:w-auto justify-between lg:order-2">
            <button
              type="button"
              data-dropdown-toggle="notification-dropdown"
              className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 btn-notification me-2"
            >
              <span className="sr-only">Thông báo</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
              </svg>
              <div
                className={` z-50 absolute notification-dropdown max-w-sm my-2 overflow-hidden text-base list-none bg-white divide-y divide-gray-100 rounded shadow-lg`}
                id="notification-dropdown"
              >
                <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 ">
                  Thông báo
                </div>
                <div>
                  <a
                    href="#"
                    className="flex px-4 py-3 border-b hover:bg-gray-100 "
                  >
                    <div className="flex-shrink-0">
                      <img
                        className="rounded-full w-11 h-11"
                        src="https://i.pinimg.com/236x/1a/a4/1c/1aa41ccc034a7bb9393241f8e42a5d4b.jpg"
                        alt="Jese image"
                      />
                      <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 border border-white rounded-full bg-primary-700 ">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                          <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="w-full pl-3 text-start">
                      <div className="text-gray-500 font-normal text-sm mb-1.5 ">
                        New message from{" "}
                        <span className="font-semibold text-gray-900 ">
                          Bonnie Green
                        </span>
                        : "Hey, what's up? All set for the presentation?"
                      </div>
                      <div className="text-xs font-medium text-primary-700 ">
                        a few moments ago
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="flex px-4 py-3 border-b hover:bg-gray-100 "
                  >
                    <div className="flex-shrink-0">
                      <img
                        className="rounded-full w-11 h-11"
                        src="https://i.pinimg.com/564x/8c/83/82/8c83828639fca53124be2060480d2d60.jpg"
                        alt="Joseph image"
                      />
                      <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-red-600 border border-white rounded-full ">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="w-full pl-3 text-start">
                      <div className="text-gray-500 font-normal text-sm mb-1.5 ">
                        <span className="font-semibold text-gray-900 ">
                          Joseph Mcfall
                        </span>{" "}
                        and{" "}
                        <span className="font-medium text-gray-900 ">
                          141 others
                        </span>{" "}
                        love your story. See it and view more stories.
                      </div>
                      <div className="text-xs font-medium text-primary-700 ">
                        44 minutes ago
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </button>
            <button id="disclosure" className="relative">
              <div className="text-gray-800 bg-gray-100 hover:bg-gray-50 font-medium rounded-full text-sm px-2 lg:px-2 py-2 lg:py-1.75 mr-2 dark:hover:bg-gray-700 focus:outline-none flex">
                <div className="w-[35px] h-[35px] avatar border rounded-full overflow-hidden">
                  <img
                    src="https://nhadepso.com/wp-content/uploads/2023/03/cap-nhat-99-hinh-anh-avatar-gau-cute-de-thuong-ngo-nghinh_1.jpg"
                    alt="avatar"
                    className=" w-full object-fit-cover"
                  />
                </div>

                <span className="px-2 my-auto">Nguyễn Thị Ngọc Mai</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  style={{ fontSize: "10px" }}
                  className="my-auto"
                />
              </div>
              <ul
                className="absolute w-full text-start border shadow-md rounded-md bg-white"
                id="disclosure-1"
              >
                <li className="hover:bg-gray-50 w-full mt-0">
                  <Link
                    to="/profile"
                    className="block py-1 text-sm font-semibold leading-8 text-gray-900 w-full px-2 "
                  >
                    Thông tin tài khoản
                  </Link>
                </li>
                <li className="hover:bg-gray-50 w-full mt-0">
                  <Link
                    to="/manager-users"
                    className="block py-1 text-sm font-semibold leading-8 text-gray-900 w-full px-2 "
                  >
                    Quản lý tài khoản
                  </Link>
                </li>
                <li className="hover:bg-gray-50 w-full mt-0">
                  <a
                    href="#"
                    className="block py-1 text-sm font-semibold leading-8 text-gray-900 w-full px-2 "
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </a>
                </li>
              </ul>
            </button>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
              aria-controls="mobile-menu-2"
              aria-expanded="false"
              onClick={() => handleOpenMenu()}
            >
              <span className="sr-only">Mở menu chính</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
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
          <div
            className={`${
              openMenu ? "block" : "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to="/"
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                  aria-current="page"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/danh-sach-kpi"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 "
                >
                  KPI
                </Link>
              </li>
              <li>
                <Link
                  to="/task-list"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  Công việc
                </Link>
              </li>
              <li>
                <Link
                  to="/note-list"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  Kế hoạch (Note)
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
