import { Link } from "react-router-dom";
import LayoutTask from ".";
import { useState } from "react";

function JobManager() {
  const [hidden, isHidden] = useState(true);
  const handleHidden = () => {
    isHidden(!hidden);
  };
  return (
    <LayoutTask>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
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
                      </div>
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
                      Người thực hiện
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Tiến độ tự đánh giá
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Link
                    </th>
                    <th
                      scope="col"
                      className="text-xs font-medium text-left text-gray-500 uppercase"
                    >
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-{{ .id }}"
                          aria-describedby="checkbox-1"
                          type="checkbox"
                          className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        />
                        <label htmlFor="checkbox-{{ .id }}" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>

                    <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs">
                      <Link to="/detail-task" className="underline">
                        Review team holiday schedule
                      </Link>
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                      <Link>Nguyễn Thị Ngọc Mai</Link>
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                      60%
                    </td>
                    <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs">
                      <Link
                        to="/detail-task"
                        target="_blank"
                        className="underline"
                      >
                        Review team holiday schedule
                      </Link>
                    </td>

                    <td className="w-fit p-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      <button
                        className="bg-blue-500 text-white text-xs p-1"
                        onClick={() => handleHidden()}
                      >
                        Đánh giá
                      </button>
                    </td>
                    <td className=" text-sm font-medium text-gray-900 whitespace-nowrap"></td>
                  </tr>
                  <tr className="">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-{{ .id }}"
                          aria-describedby="checkbox-1"
                          type="checkbox"
                          className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        />
                        <label htmlFor="checkbox-{{ .id }}" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>

                    <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs">
                      <Link to="/detail-task" className="underline">
                        Review team holiday schedule
                      </Link>
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                      <Link>Nguyễn Thị Ngọc Mai</Link>
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                      60%
                    </td>
                    <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs">
                      <Link
                        to="/detail-task"
                        target="_blank"
                        className="underline"
                      >
                        Review team holiday schedule
                      </Link>
                    </td>
                    <td className="w-fit p-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      <button
                        className="bg-blue-500 text-white text-xs p-1"
                        onClick={() => handleHidden()}
                      >
                        Đánh giá
                      </button>
                    </td>
                    <td className=" text-sm font-medium text-gray-900 whitespace-nowrap"></td>
                  </tr>
                  <tr className="">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-{{ .id }}"
                          aria-describedby="checkbox-1"
                          type="checkbox"
                          className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        />
                        <label htmlFor="checkbox-{{ .id }}" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>

                    <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs">
                      <Link to="/detail-task" className="underline">
                        Review team holiday schedule
                      </Link>
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                      <Link>Nguyễn Thị Ngọc Mai</Link>
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                      60%
                    </td>
                    <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs">
                      <Link
                        to="/detail-task"
                        target="_blank"
                        className="underline"
                      >
                        Review team holiday schedule
                      </Link>
                    </td>

                    <td className="w-fit p-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      <button
                        className="bg-blue-500 text-white text-xs p-1"
                        onClick={() => handleHidden()}
                      >
                        Đánh giá
                      </button>
                    </td>
                    <td className="p text-sm font-medium text-gray-900 whitespace-nowrap">
                      <button className="border-2 border-gray-100 rounded-full text-white text-xs"></button>
                    </td>
                  </tr>
                  <tr className="">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-{{ .id }}"
                          aria-describedby="checkbox-1"
                          type="checkbox"
                          className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        />
                        <label htmlFor="checkbox-{{ .id }}" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>

                    <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs">
                      <Link to="/detail-task" className="underline">
                        Review team holiday schedule
                      </Link>
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                      <Link>Nguyễn Thị Ngọc Mai</Link>
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                      60%
                    </td>
                    <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs">
                      <Link
                        to="/detail-task"
                        target="_blank"
                        className="underline"
                      >
                        Review team holiday schedule
                      </Link>
                    </td>

                    <td className="w-fit p-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      <button
                        className="bg-blue-500 text-white text-xs p-1"
                        onClick={() => handleHidden()}
                      >
                        Đánh giá
                      </button>
                    </td>
                    <td className=" text-sm font-medium text-gray-900 whitespace-nowrap"></td>
                  </tr>
                  <tr className="">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-{{ .id }}"
                          aria-describedby="checkbox-1"
                          type="checkbox"
                          className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        />
                        <label htmlFor="checkbox-{{ .id }}" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>

                    <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs">
                      <Link to="/detail-task" className="underline">
                        Review team holiday schedule
                      </Link>
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                      <Link>Nguyễn Thị Ngọc Mai</Link>
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-500 whitespace-nowrap">
                      60%
                    </td>
                    <td className="max-w-sm p-4 overflow-hidden text-sm font-normal text-gray-500 truncate xl:max-w-xs">
                      <Link
                        to="/detail-task"
                        target="_blank"
                        className="underline"
                      >
                        Review team holiday schedule
                      </Link>
                    </td>

                    <td className="w-fit p-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      <button
                        className="bg-blue-500 text-white text-xs p-1"
                        onClick={() => handleHidden()}
                      >
                        Đánh giá
                      </button>
                    </td>
                    <td className=" text-sm font-medium text-gray-900 whitespace-nowrap"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed left-0 right-0 z-50 ${
          hidden ? "hidden" : "flex"
        } items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full `}
        id="new-task-modal"
      >
        <div className="relative w-full h-full max-w-3xl m-auto px-4 md:h-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-start justify-between p-5 border-b rounded-t ">
              <h3 className="text-xl font-semibold">
                Chi tiết tiến độ công việc
              </h3>
              <button
                type="button"
                onClick={() => handleHidden()}
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
            <div className="content p-5  border-b">
              <div className="border-b">
                <h5 className="font-semibold te">
                  Danh sách công việc đã hoàn thành
                </h5>
                <ul>
                  <li className="text-sm py-1.5">Nộp báo cáo</li>
                </ul>
              </div>
              <div className="border-b py-3">
                <h5 className="font-semibold">Tiến độ hoàn thành</h5>
                <div className="font-bold text-blue-500">60%</div>
              </div>
              <div className="py-3">
                <h5 className="font-semibold">Đường link tài liệu báo cáo</h5>
                <Link className="text-xs underline">
                  File bao cao cong việc
                </Link>
              </div>
            </div>
            <div className="text-right p-4">
              <button className="bg-red-500 text-white text-xs p-1 mx-1">
                Đánh giá lại
              </button>
              <button className="bg-blue-500 text-white text-xs p-1 mx-1">
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </LayoutTask>
  );
}

export default JobManager;
