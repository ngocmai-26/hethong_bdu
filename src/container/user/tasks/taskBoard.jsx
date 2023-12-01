import LayoutTask from ".";

function TaskBoard() {
  return (
    <LayoutTask>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <div className=" bg-white p-5 min-w-[960px]">
                <div className="bg-neutral-100 grid grid-cols-4 gap-0 pb-4">
                  <div className="plan ">
                    <div className="plan-header bg-violet-100 px-4 py-3 border-b-violet-300 border-b-2">
                      <p className="text-black text-sm py-1">Kế hoạch</p>
                      <p className="text-black text-xs">3 công việc</p>
                    </div>
                    <div className="plan-content px-2">
                      <div className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2">
                        <a href="">
                          <p className="text-xs font-semibold">
                            Prepare slide deck for client meeting
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-1 my-2 dark:bg-gray-700">
                            <div
                              className="bg-blue-600 h-1 rounded-full dark:bg-blue-500"
                              style={{ width: "45%" }}
                            ></div>
                          </div>
                          <div className="start-time">
                            <span className="text-xs text-slate-400">
                              Start date:{" "}
                            </span>
                            <span className="text-xs">10-17</span>
                          </div>
                        </a>
                      </div>
                      <div className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2">
                        <a href="">
                          <p className="text-xs font-semibold">
                            Prepare slide deck for client meeting
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-1 my-2 dark:bg-gray-700">
                            <div
                              className="bg-blue-600 h-1 rounded-full dark:bg-blue-500"
                              style={{ width: "45%" }}
                            ></div>
                          </div>
                          <div className="start-time">
                            <span className="text-xs text-slate-400">
                              Start date:{" "}
                            </span>
                            <span className="text-xs">10-17</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="attention">
                    <div className="attention-header bg-red-200 px-4 py-3 border-b-red-300 border-b-2">
                      <p className="text-black text-sm py-1">Đến hạn</p>
                      <p className="text-black text-xs">1 công việc</p>
                    </div>
                    <div className="plan-content px-2">
                      <div className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2">
                        <a href="">
                          <p className="text-xs font-semibold">
                            Prepare slide deck for client meeting
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-1 my-2 dark:bg-gray-700">
                            <div
                              className="bg-blue-600 h-1 rounded-full dark:bg-blue-500"
                              style={{ width: "45%" }}
                            ></div>
                          </div>
                          <div className="start-time">
                            <span className="text-xs text-slate-400">
                              Start date:{" "}
                            </span>
                            <span className="text-xs">10-17</span>
                          </div>
                        </a>
                      </div>
                      <div className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2">
                        <a href="">
                          <p className="text-xs font-semibold">
                            Prepare slide deck for client meeting
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-1 my-2 dark:bg-gray-700">
                            <div
                              className="bg-blue-600 h-1 rounded-full dark:bg-blue-500"
                              style={{ width: "45%" }}
                            ></div>
                          </div>
                          <div className="start-time">
                            <span className="text-xs text-slate-400">
                              Start date:{" "}
                            </span>
                            <span className="text-xs">10-17</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="progress">
                    <div className="progress-header bg-green-100 px-4 py-3 border-b-green-300 border-b-2">
                      <p className="text-black text-sm py-1">Đang tiến hành</p>
                      <p className="text-black text-xs">1 công việc</p>
                    </div>
                    <div className="plan-content px-2">
                      <div className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2">
                        <a href="">
                          <p className="text-xs font-semibold">
                            Prepare slide deck for client meeting
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-1 my-2 dark:bg-gray-700">
                            <div
                              className="bg-blue-600 h-1 rounded-full dark:bg-blue-500"
                              style={{ width: "45%" }}
                            ></div>
                          </div>
                          <div className="start-time">
                            <span className="text-xs text-slate-400">
                              Start date:{" "}
                            </span>
                            <span className="text-xs">10-17</span>
                          </div>
                        </a>
                      </div>
                      <div className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2">
                        <a href="">
                          <p className="text-xs font-semibold">
                            Prepare slide deck for client meeting
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-1 my-2 dark:bg-gray-700">
                            <div
                              className="bg-blue-600 h-1 rounded-full dark:bg-blue-500"
                              style={{ width: "45%" }}
                            ></div>
                          </div>
                          <div className="start-time">
                            <span className="text-xs text-slate-400">
                              Start date:{" "}
                            </span>
                            <span className="text-xs">10-17</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="completed">
                    <div className="completed-header bg-emerald-200 px-4 py-3 border-b-emerald-500 border-b-2">
                      <p className="text-black text-sm py-1">Hoàn thành</p>
                      <p className="text-black text-xs">1 công việc</p>
                    </div>
                    <div className="plan-content px-2">
                      <div className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2">
                        <a href="">
                          <p className="text-xs font-semibold">
                            Prepare slide deck for client meeting
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-1 my-2 dark:bg-gray-700">
                            <div
                              className="bg-blue-600 h-1 rounded-full dark:bg-blue-500"
                              style={{ width: "45%" }}
                            ></div>
                          </div>
                          <div className="start-time">
                            <span className="text-xs text-slate-400">
                              Start date:{" "}
                            </span>
                            <span className="text-xs">10-17</span>
                          </div>
                        </a>
                      </div>
                      <div className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2">
                        <a href="">
                          <p className="text-xs font-semibold">
                            Prepare slide deck for client meeting
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-1 my-2 dark:bg-gray-700">
                            <div
                              className="bg-blue-600 h-1 rounded-full dark:bg-blue-500"
                              style={{ width: "45%" }}
                            ></div>
                          </div>
                          <div className="start-time">
                            <span className="text-xs text-slate-400">
                              Start date:{" "}
                            </span>
                            <span className="text-xs">10-17</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutTask>
  );
}

export default TaskBoard;
