import { useLayoutEffect, useState } from "react";

import LayoutAdmin from "../layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllRole, getRoleById } from "../../../thunks/RoleThunk";
import { Link, useParams } from "react-router-dom";

function RolesDetail() {
  const { id } = useParams();
  const { allRole , singleRole} = useSelector((state) => state.roleReducer);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (allRole.length <= 0) {
      dispatch(getAllRole());
    }
  }, []);
  useLayoutEffect(() => {
    if (id) {
      dispatch(getRoleById(id));
    }
  }, []);

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
              Chi tiết thông tin
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
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
                    <span>{singleRole?.response?.roleName}</span>
                  </div>
                  <div className="col-span-6">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="">
                        <span className="text-sm font-medium">
                          Lựa chọn quyền
                        </span>
                        <div className="border-2 h-40 overflow-y-auto overflow-hidden">
                          <ul>
                            {singleRole?.response?.permissions?.map((item) => (
                              <li className="hover:bg-gray-100">
                                {item?.permissionName}
                              </li>
                            ))}
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
                    <span className="text-sm">{singleRole?.response?.description}</span>
                  </div>
                </div>
                <div className=" py-6 border-t border-gray-200 rounded-b flex justify-end  ">
                  <Link
                    className="bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    to="/category-role"
                  >
                    Quay lại
                  </Link>
                </div>
              </form>
            </div>
            </div>
          </div>
        </div>
      </div>

    </LayoutAdmin>
  );
}

export default RolesDetail;
