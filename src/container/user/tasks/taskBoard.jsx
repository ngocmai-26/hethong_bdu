import { useDispatch, useSelector } from "react-redux";
import LayoutTask from ".";
import { getAllJob } from "../../../thunks/JobsThunk";
import { useEffect, useLayoutEffect } from "react";
import { status } from "../../../constants/fakedata";
import { Link } from "react-router-dom";
import { setSearchJob } from "../../../slices/JobsSlice";

function TaskBoard() {
  const { allJob, searchJobs } = useSelector((state) => state.jobsReducer);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (allJob.length <= 0) {
      dispatch(getAllJob());
    }
  }, []);

  useEffect(() => {
    if (allJob.length > 0) {
      dispatch(setSearchJob(allJob));
    }
  }, [dispatch, allJob])
  
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
                      <p className="text-black text-xs">{allJob.filter(item => item.status === 1).length} công việc</p>
                    </div>
                    <div className="plan-content px-2">
                      {searchJobs.map((item, key) => item.status === 1? (
                        <div className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2" key={key}>
                        <Link to={`/jobs/${item.id}`}>
                          <p className="text-xs font-semibold">
                            {item.title}
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
                        </Link>
                      </div>
                      ): (<></>))

                      }
                    </div>
                  </div>
                  <div className="attention">
                    <div className="attention-header bg-red-200 px-4 py-3 border-b-red-300 border-b-2">
                      <p className="text-black text-sm py-1">Đến hạn</p>
                      <p className="text-black text-xs">{allJob.filter(item => item.status === 2).length} công việc</p>
                    </div>
                    <div className="plan-content px-2">
                    {searchJobs.map((item, key) => item.status === 2? (
                        <div className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2" key={key}>
                        <Link to={`/jobs/${item.id}`}>
                          <p className="text-xs font-semibold">
                            {item.title}
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
                        </Link>
                      </div>
                      ): (<></>))

                      }
                    </div>
                  </div>
                  <div className="progress">
                    <div className="progress-header bg-green-100 px-4 py-3 border-b-green-300 border-b-2">
                      <p className="text-black text-sm py-1">Đang tiến hành</p>
                      <p className="text-black text-xs">{allJob.filter(item => item.status === 3).length} công việc</p>
                    </div>
                    <div className="plan-content px-2">
                    {searchJobs.map((item, key) => item.status === 3? (
                        <div className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2" key={key}>
                        <Link to={`/jobs/${item.id}`}>
                          <p className="text-xs font-semibold">
                            {item.title}
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
                        </Link>
                      </div>
                      ): (<></>))

                      }
                    </div>
                  </div>
                  <div className="completed">
                    <div className="completed-header bg-emerald-200 px-4 py-3 border-b-emerald-500 border-b-2">
                      <p className="text-black text-sm py-1">Hoàn thành</p>
                      <p className="text-black text-xs">{allJob.filter(item => item.status === 4).length} công việc</p>
                    </div>
                    <div className="plan-content px-2">
                    {searchJobs.map((item, key) => item.status === 4? (
                        <div className="plan-item bg-white m-2 px-2 py-4 rounded-sm shadow hover:bg-gray-50 hover:cursor-pointer my-2" key={key}>
                        <Link to={`/jobs/${item.id}`}>
                          <p className="text-xs font-semibold">
                            {item.title}
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
                        </Link>
                      </div>
                      ): (<></>))

                      }
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
