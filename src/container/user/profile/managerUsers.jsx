import Profile from ".";

function ManagerUsers() {
  return (
    <>
      <Profile>
        <div className="profile-content p-5">
          <div className="general py-4">
          
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden shadow">
                    <table className="min-w-full divide-y divide-gray-200 table-fixed">
                      <thead className="bg-gray-100 ">
                        <tr>
                          <th
                            scope="col"
                            className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                          >
                            STT
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                          >
                            Avatar
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                          >
                            Họ và tên
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                          >
                            SDT
                          </th>
                         
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr className="hover:bg-gray-100">
                          <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              1
                            </div>
                          </td>
                          <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs">
                            <img
                              src="https://www.studytienganh.vn/upload/2022/05/112272.jpg"
                              alt=""
                              className="w-10 h-10 rounded-full"
                            />
                          </td>
                          <td className="p-4 text-sm text-gray-900 whitespace-nowrap">
                            technology
                          </td>
                          <td className="p-4 text-sm text-gray-900 whitespace-nowrap">
                            maibaby
                          </td>
                          <td className="p-4 text-sm text-gray-900 whitespace-nowrap">
                            maibaby@gmail.com
                          </td>

                        </tr>
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
                <span className="font-semibold text-gray-900">1-20</span> of{" "}
                <span className="font-semibold text-gray-900">2290</span>
              </span>
            </div>
          </div>
          </div>
        </div>
      </Profile>
    </>
  );
}

export default ManagerUsers;
