import { useState } from "react";
import KPI from ".";
import Layout from "../layout";

function RequestKPI() {
  const [isHidden, setIsHidden] = useState(true);
  const handleHidden = () => {
    setIsHidden(!isHidden);
  };
  return (
    <>
      <KPI>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <div className="bg-white p-5 min-w-[960px]">
                  <div className="bg-neutral-100 grid grid-cols-5 gap-0 pb-4">
                    <div className="least ">
                      <div className="least-header bg-red-300 px-4 py-3 border-b-red-500 border-b-2">
                        <p className="text-black text-sm py-1">Kém</p>
                        <p className="text-black text-xs">2 đánh giá</p>
                      </div>
                      <div className="least-content px-2">
                        <div className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2">
                          <button
                            onClick={() => handleHidden()}
                            className="text-start"
                          >
                            <p className="text-xs font-semibold">
                              Đánh giá KPI - tháng 1
                            </p>
                            <div className="score">
                              <span className="text-xs text-slate-400">
                                Điểm:{" "}
                              </span>
                              <span className="text-xs">90</span>
                            </div>
                            <div className="start-time">
                              <span className="text-xs text-slate-400">
                                Ngày đánh giá:{" "}
                              </span>
                              <span className="text-xs">02-10-2023</span>
                            </div>
                          </button>
                        </div>
                        <div className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2">
                          <button
                            onClick={() => handleHidden()}
                            className="text-start"
                          >
                            <p className="text-xs font-semibold">
                              Đánh giá KPI - tháng 1
                            </p>
                            <div className="score">
                              <span className="text-xs text-slate-400">
                                Điểm:{" "}
                              </span>
                              <span className="text-xs">90</span>
                            </div>
                            <div className="start-time">
                              <span className="text-xs text-slate-400">
                                Ngày đánh giá:{" "}
                              </span>
                              <span className="text-xs">02-10-2023</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="weak">
                      <div className="weak-header bg-orange-300 px-4 py-3 border-b-orange-500 border-b-2">
                        <p className="text-black text-sm py-1">Yếu</p>
                        <p className="text-black text-xs">2 đánh giá</p>
                      </div>
                      <div className="plan-content px-2">
                        <div className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2">
                          <button
                            onClick={() => handleHidden()}
                            className="text-start"
                          >
                            <p className="text-xs font-semibold">
                              Đánh giá KPI - tháng 1
                            </p>
                            <div className="score">
                              <span className="text-xs text-slate-400">
                                Điểm:{" "}
                              </span>
                              <span className="text-xs">90</span>
                            </div>
                            <div className="start-time">
                              <span className="text-xs text-slate-400">
                                Ngày đánh giá:{" "}
                              </span>
                              <span className="text-xs">02-10-2023</span>
                            </div>
                          </button>
                        </div>
                        <div className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2">
                          <button
                            onClick={() => handleHidden()}
                            className="text-start"
                          >
                            <p className="text-xs font-semibold">
                              Đánh giá KPI - tháng 1
                            </p>
                            <div className="score">
                              <span className="text-xs text-slate-400">
                                Điểm:{" "}
                              </span>
                              <span className="text-xs">90</span>
                            </div>
                            <div className="start-time">
                              <span className="text-xs text-slate-400">
                                Ngày đánh giá:{" "}
                              </span>
                              <span className="text-xs">02-10-2023</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="medium">
                      <div className="medium-header bg-yellow-300 px-4 py-3 border-b-yellow-500 border-b-2">
                        <p className="text-black text-sm py-1">Trung bình</p>
                        <p className="text-black text-xs">2 đánh giá</p>
                      </div>
                      <div className="plan-content px-2">
                        <div className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2">
                          <button
                            onClick={() => handleHidden()}
                            className="text-start"
                          >
                            <p className="text-xs font-semibold">
                              Đánh giá KPI - tháng 1
                            </p>
                            <div className="score">
                              <span className="text-xs text-slate-400">
                                Điểm:{" "}
                              </span>
                              <span className="text-xs">90</span>
                            </div>
                            <div className="start-time">
                              <span className="text-xs text-slate-400">
                                Ngày đánh giá:{" "}
                              </span>
                              <span className="text-xs">02-10-2023</span>
                            </div>
                          </button>
                        </div>
                        <div className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2">
                          <button
                            onClick={() => handleHidden()}
                            className="text-start"
                          >
                            <p className="text-xs font-semibold">
                              Đánh giá KPI - tháng 1
                            </p>
                            <div className="score">
                              <span className="text-xs text-slate-400">
                                Điểm:{" "}
                              </span>
                              <span className="text-xs">90</span>
                            </div>
                            <div className="start-time">
                              <span className="text-xs text-slate-400">
                                Ngày đánh giá:{" "}
                              </span>
                              <span className="text-xs">02-10-2023</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="good">
                      <div className="good-header bg-cyan-300 px-4 py-3 border-b-cyan-500 border-b-2">
                        <p className="text-black text-sm py-1">Tốt</p>
                        <p className="text-black text-xs">2 đánh giá</p>
                      </div>
                      <div className="plan-content px-2">
                        <div className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2">
                          <button
                            onClick={() => handleHidden()}
                            className="text-start"
                          >
                            <p className="text-xs font-semibold">
                              Đánh giá KPI - tháng 1
                            </p>
                            <div className="score">
                              <span className="text-xs text-slate-400">
                                Điểm:{" "}
                              </span>
                              <span className="text-xs">90</span>
                            </div>
                            <div className="start-time">
                              <span className="text-xs text-slate-400">
                                Ngày đánh giá:{" "}
                              </span>
                              <span className="text-xs">02-10-2023</span>
                            </div>
                          </button>
                        </div>
                        <div className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2">
                          <button
                            onClick={() => handleHidden()}
                            className="text-start"
                          >
                            <p className="text-xs font-semibold">
                              Đánh giá KPI - tháng 1
                            </p>
                            <div className="score">
                              <span className="text-xs text-slate-400">
                                Điểm:{" "}
                              </span>
                              <span className="text-xs">90</span>
                            </div>
                            <div className="start-time">
                              <span className="text-xs text-slate-400">
                                Ngày đánh giá:{" "}
                              </span>
                              <span className="text-xs">02-10-2023</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="excellent">
                      <div className="excellent-header bg-green-300 px-4 py-3 border-b-green-500 border-b-2">
                        <p className="text-black text-sm py-1">Xuất sắc</p>
                        <p className="text-black text-xs">2 đánh giá</p>
                      </div>
                      <div className="plan-content px-2">
                        <div className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2">
                          <button
                            onClick={() => handleHidden()}
                            className="text-start"
                          >
                            <p className="text-xs font-semibold">
                              Đánh giá KPI - tháng 1
                            </p>
                            <div className="score">
                              <span className="text-xs text-slate-400">
                                Điểm:{" "}
                              </span>
                              <span className="text-xs">90</span>
                            </div>
                            <div className="start-time">
                              <span className="text-xs text-slate-400">
                                Ngày đánh giá:{" "}
                              </span>
                              <span className="text-xs">02-10-2023</span>
                            </div>
                          </button>
                        </div>
                        <div className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2">
                          <button
                            onClick={() => handleHidden()}
                            className="text-start"
                          >
                            <p className="text-xs font-semibold">
                              Đánh giá KPI - tháng 1
                            </p>
                            <div className="score">
                              <span className="text-xs text-slate-400">
                                Điểm:{" "}
                              </span>
                              <span className="text-xs">90</span>
                            </div>
                            <div className="start-time">
                              <span className="text-xs text-slate-400">
                                Ngày đánh giá:{" "}
                              </span>
                              <span className="text-xs">02-10-2023</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </KPI>
      <div
        className={`fixed left-0 right-0 z-50 items-center justify-center ${
          isHidden ? "hidden" : "flex"
        } overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full`}
        id="new-task-modal"
      >
        <div className="relative w-full h-full max-w-6xl m-auto px-4 md:h-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-start justify-between p-5 border-b rounded-t ">
              <h3 className="text-xl font-semibold">
                Kết quả đánh giá KPI tháng
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

            <div className="p-6 space-y-6">
              <div className="header-task ">
                <div className="content bg-white py-5 px-3">
                  <div className="information">
                    <div className="flex">
                      <p className="uppercase text-lg font-medium">
                        KPI - Nguyễn Thị Ngọc Mai [TE611] 01/11/2023 -
                        30/11/2023
                      </p>
                    </div>
                    <div className="grid grid-cols-2 py-5">
                      <div className="grid grid-cols-3">
                        <div className="border-e-2">
                          <p className="text-xs leading-6 font-medium">
                            Phòng ban:
                          </p>
                          <p className="text-xs leading-6 font-medium">
                            Chức vụ:
                          </p>
                          <p className="text-xs leading-6 font-medium">
                            Nhân viên:
                          </p>
                          <p className="text-xs leading-6 font-medium">
                            Kết quả KPI:
                          </p>
                          <p className="text-xs leading-6 font-medium">
                            Xếp loại:
                          </p>
                        </div>
                        <div className="col-span-2 px-3">
                          <p className="text-xs leading-6 font-medium">
                            Khoa CNTT
                          </p>
                          <p className="text-xs leading-6 font-medium">
                            Nhân viên
                          </p>
                          <p className="text-xs leading-6 font-medium">
                            Nguyễn Thị Ngọc Mai &#60;ngocmai@gmail.com&#62;
                          </p>
                          <p className="text-xs leading-6 font-medium">80%</p>
                          <p className="text-xs leading-6 font-medium">Tốt</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3">
                        <div className="border-e-2">
                          <p className="text-xs leading-6 font-medium">
                            Start Date
                          </p>
                          <p className="text-xs leading-6 font-medium">
                            End Date
                          </p>
                          <p className="text-xs leading-6 font-medium">
                            Người đánh giá
                          </p>
                          <p className="text-xs leading-6 font-medium">
                            Quản lý
                          </p>
                        </div>
                        <div className="col-span-2 px-3">
                          <p className="text-xs leading-6 font-medium">
                            01/11/2023
                          </p>
                          <p className="text-xs leading-6 font-medium">
                            30/11/2023
                          </p>
                          <p className="text-xs leading-6 font-medium">
                            Nguyễn Thanh Sơn &#60;ngocmai@gmail.com&#62;
                          </p>
                          <p className="text-xs leading-6 font-medium">
                            Nguyễn Thanh Sơn
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <form action="">
                    <div className="group-item py-3">
                      <p>Danh sách tiêu chí đánh giá KPI nhân viên</p>
                      <div className="table">
                        <div className="thead">
                          <div className="grid grid-cols-12 gap-2 bg-red-500">
                            <div className="stt my-auto p-2 text-xs font-medium text-left text-white uppercase">
                              STT
                            </div>
                            <div className="col-span-7 my-auto p-2 text-xs font-medium text-left text-white uppercase">
                              Nội dung tiêu chí đánh giá
                            </div>
                            <div className="my-auto p-2 text-xs font-medium text-left text-white uppercase">
                              Điểm tối đa
                            </div>
                            <div className="my-auto p-2 text-xs font-medium text-left text-white uppercase">
                              Điểm tự đánh giá
                            </div>
                            <div className="my-auto p-2 text-xs font-medium text-left text-white uppercase">
                              Tỉ lệ hoàn thành
                            </div>
                            <div className="my-auto p-2 text-xs font-medium text-left text-white uppercase">
                              Thẩm định
                            </div>
                          </div>
                        </div>
                        <div className="tbody">
                          <div className="">
                            <div className="grid grid-cols-12 gap-2 kpi-main bg-red-300">
                              <div className="stt my-auto p-2 text-xs font-medium text-left text-white">
                                1
                              </div>
                              <div className="col-span-7 my-auto p-2 text-xs font-medium text-left text-white">
                                Hoạt động chung
                              </div>
                              <div className="my-auto p-2 text-xs font-medium text-center text-white">
                                21
                              </div>
                              <div className="my-auto p-2 text-xs font-medium text-center text-white">
                                0
                              </div>
                              <div className="my-auto p-2 text-xs font-medium text-center text-white">
                                0
                              </div>
                              <div className="my-auto p-2 text-xs font-medium text-center text-white">
                                0
                              </div>
                            </div>
                            <div className="grid grid-cols-12 gap-2 kpi-main bg-stone-100">
                              <div className="stt my-auto p-2 text-xs font-medium text-left text-black">
                                1
                              </div>
                              <div className="col-span-7 my-auto p-2 text-xs font-medium text-left text-black">
                                Hoạt động chung
                              </div>
                              <div className="my-auto p-2 text-xs font-medium text-center text-black">
                                5
                              </div>
                              <div className="my-auto p-2 text-xs font-medium text-center text-black">
                                4
                              </div>
                              <div className="my-auto p-2 text-xs font-medium text-center text-black">
                                4
                              </div>
                              <div className="my-auto p-2 text-xs font-medium text-center text-black">
                                4
                              </div>
                            </div>
                            <div className="grid grid-cols-12 gap-2 kpi-main bg-stone-100">
                              <div className="stt my-auto p-2 text-xs font-medium text-left text-black">
                                1
                              </div>
                              <div className="col-span-7 my-auto p-2 text-xs font-medium text-left text-black">
                                Hoạt động chung
                              </div>
                              <div className="my-auto p-2 text-xs font-medium text-center text-black">
                                4
                              </div>
                              <div className="my-auto p-2 text-xs font-medium text-center text-black">
                                4
                              </div>
                              <div className="my-auto p-2 text-xs font-medium text-center text-black">
                                4
                              </div>
                              <div className="my-auto p-2 text-xs font-medium text-center text-black">
                                4
                              </div>
                            </div>
                            <div className="grid grid-cols-12 gap-2 kpi-main bg-stone-100">
                              <div className="stt my-auto p-2 text-xs font-medium text-left text-black">
                                1
                              </div>
                              <div className="col-span-7 my-auto p-2 text-xs font-medium text-left text-black">
                                Hoạt động chung
                              </div>
                              <div className="my-auto p-2 text-xs font-medium text-center text-black">
                                5
                              </div>
                              <div className="my-auto p-2 text-xs font-medium text-center text-black">
                                4
                              </div>
                              <div className="my-auto p-2 text-xs font-medium text-center text-black">
                                4
                              </div>
                              <div className="my-auto p-2 text-xs font-medium text-center text-black">
                                4
                              </div>
                            </div>
                            <div className="grid grid-cols-12 gap-2 kpi-main bg-stone-100">
                              <div className="stt my-auto p-2 text-xs font-medium text-left text-black">
                                1
                              </div>
                              <div className="col-span-7 my-auto p-2 text-xs font-medium text-left text-black">
                                Hoạt động chung
                              </div>
                              <div className="my-auto p-2 text-xs font-medium text-center text-black">
                                6
                              </div>
                              <div className="my-auto p-2 text-xs font-medium text-center text-black">
                                4
                              </div>
                              <div className="my-auto p-2 text-xs font-medium text-center text-black">
                                4
                              </div>
                              <div className="my-auto p-2 text-xs font-medium text-center text-black">
                                4
                              </div>
                            </div>
                            <div className="grid grid-cols-12 gap-2 kpi-main bg-stone-100">
                              <div className="col-span-9 my-auto p-2 text-sm font-semibold text-center text-red-700">
                                <p className="text-right">Tổng điểm:</p>
                              </div>
                              <div className="my-auto p-2 text-sm font-semibold text-red-700 text-center">
                                8
                              </div>
                              <div className="my-auto p-2 text-sm font-semibold text-red-700 text-center">
                                0
                              </div>
                              <div className="my-auto p-2 text-sm font-semibold text-red-700 text-center">
                                0
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group-item py-3">
                      <div className="note">
                        <label htmlFor="">Ghi chú</label>
                        <p className="border-2 border-gray-100 text-sm p-2">
                          Không có ghi chú gì
                        </p>
                      </div>
                    </div>
                    <div className="group-item py-3">
                      <div className="flex justify-between py-2">
                        <p>Danh sách file minh chứng</p>
                      </div>

                      <div className="table w-full">
                        <div className="thead">
                          <div className="grid grid-cols-12 gap-2 bg-red-500">
                            <div className="stt my-auto p-2 text-xs font-medium text-left text-white uppercase">
                              STT
                            </div>
                            <div className="text-center col-span-10 my-auto p-2 text-xs font-medium text-white uppercase">
                              Tên file
                            </div>
                            <div className="my-auto p-2 text-xs font-medium text-left text-white uppercase">
                              Ngày tải
                            </div>
                          </div>
                        </div>
                        <div className="tbody">
                          <div className="">
                            <div className="grid grid-cols-12 gap-2 kpi-main bg-red-300">
                              <div className="stt my-auto p-2 text-xs font-medium text-left text-white">
                                1
                              </div>
                              <div className="col-span-10 my-auto p-2 text-xs font-medium text-center text-white">
                                Hoạt động chung
                              </div>
                              <div className="my-auto p-2 text-xs font-medium text-center text-white">
                                0
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RequestKPI;
