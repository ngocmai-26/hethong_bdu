import { useState } from "react";
import avatar from "../../../asset/img/NTNM.png";
import { useDispatch } from "react-redux";
import { logout } from "../../../slices/AuthSlice";
function NavAdmin() {
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <nav className="fixed z-30 w-full bg-white border-b border-gray-200 ">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              id="toggleSidebarMobile"
              aria-expanded="true"
              aria-controls="sidebar"
              className="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100  "
            >
              <svg
                id="toggleSidebarMobileHamburger"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                id="toggleSidebarMobileClose"
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
            <a href="" className="flex ml-2 md:mr-24">
              <img src={avatar} className="mr-3 h-6 sm:h-8" alt="Logo" />
            </a>
           
          </div>
          <div className="flex items-center">
            <div className="hidden mr-3 -mb-1 sm:block"></div>
            <button
              id="toggleSidebarMobileSearch"
              type="button"
              className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 relative"
            >
              <span className="sr-only">Tìm kiếm</span>
              <svg
                className="w-6 h-6"
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
            </button>
            <button
              type="button"
              data-dropdown-toggle="notification-dropdown"
              className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 btn-notification me-2"
            >
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
                    <div className="w-full pl-3">
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
                    <div className="w-full pl-3">
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
                  <a
                    href="#"
                    className="flex px-4 py-3 border-b hover:bg-gray-100 "
                  >
                    <div className="flex-shrink-0">
                      <img
                        className="rounded-full w-11 h-11"
                        src="https://i.pinimg.com/564x/8c/83/82/8c83828639fca53124be2060480d2d60.jpg"
                        alt="Leslie image"
                      />
                      <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-green-400 border border-white rounded-full ">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="w-full pl-3">
                      <div className="text-gray-500 font-normal text-sm mb-1.5 ">
                        <span className="font-semibold text-gray-900 ">
                          Leslie Livingston
                        </span>{" "}
                        mentioned you in a comment:{" "}
                        <span className="font-medium text-primary-700 ">
                          @bonnie.green
                        </span>{" "}
                        what do you say?
                      </div>
                      <div className="text-xs font-medium text-primary-700 ">
                        1 hour ago
                      </div>
                    </div>
                  </a>
                  <a href="#" className="flex px-4 py-3 hover:bg-gray-100 ">
                    <div className="flex-shrink-0">
                      <img
                        className="rounded-full w-11 h-11"
                        src="https://i.pinimg.com/564x/8c/83/82/8c83828639fca53124be2060480d2d60.jpg"
                        alt="Robert image"
                      />
                      <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-purple-500 border border-white rounded-full ">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="w-full pl-3">
                      <div className="text-gray-500 font-normal text-sm mb-1.5 ">
                        <span className="font-semibold text-gray-900 ">
                          Robert Brown
                        </span>{" "}
                        posted a new video: Glassmorphism - learn how to
                        implement the new design trend.
                      </div>
                      <div className="text-xs font-medium text-primary-700 ">
                        3 hours ago
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </button>
          
            <div className="flex items-center ml-3">
              <div>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 relative btn-account-header "
                  id="user-menu-button-2"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-2"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="user photo"
                  />
                  <div
                    className="z-50  w-28 absolute account-header  mt-10 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow "
                    id="dropdown-2"
                  >
                    <ul className="py-1 " role="none">
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  "
                          role="menuitem"
                        >
                          Cài đặt
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                          role="menuitem"
                          onClick={handleLogout}
                        >
                          Đăng xuất
                        </a>
                      </li>
                    </ul>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavAdmin;
