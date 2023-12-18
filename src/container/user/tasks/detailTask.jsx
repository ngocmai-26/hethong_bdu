import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutTask from ".";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { deleteRole } from "../../../thunks/RoleThunk";
import { deleteJob, getJobById } from "../../../thunks/JobsThunk";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect } from "react";
import { priorities, statusList } from "../../../constants/fakedata";
import moment from "moment";
import { getAllUser } from "../../../thunks/UserThunk";

function DetailTask() {
  const { id } = useParams();
  const { singleJob } = useSelector((state) => state.jobsReducer);
  const { allUser } = useSelector((state) => state.userReducer);
  const nav = useNavigate();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (id) {
      dispatch(getJobById(String(id)));
    }
    if (allUser.length <= 0) {
      dispatch(getAllUser());
    }
  }, []);
  return (
    <LayoutTask>
      <div className="relative w-full h-full m-auto md:h-auto">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-start justify-between p-5 border-b rounded-t ">
            <h3 className="text-xl font-semibold">Chi tiết công việc</h3>
          </div>

          <div className="p-6 space-y-6">
            <form action="#">
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 h-full">
                <div className="md:col-span-2 ">
                  <div className="due">
                    <div className="grid grid-cols-1 md:grid-cols-5 sm:grid-cols-4 justify-between">
                      <div className="md:col-span-2 sm:col-span-2">
                        <label
                          htmlFor="category-create"
                          className="block text-xs font-medium text-gray-900"
                        >
                          Trạng thái công việc
                        </label>
                        {statusList.map((item, key) =>
                          item?.id === singleJob?.response?.status ? (
                            <span
                              className={`text-xs font-bold ${item.color}`}
                              key={key}
                            >
                              {item.name}
                            </span>
                          ) : (
                            <></>
                          )
                        )}
                      </div>
                      <div className="col-span-3">
                        <div className="grid grid-cols-2">
                          <div>
                            <p className="text-xs">Thời gian bắt đầu :</p>
                            <p className="text-xs">
                              {moment(
                                singleJob?.response?.jobDetail?.timeStart
                              ).format("YYYY-MM-DD")}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs">Thời gian kết thúc :</p>
                            <p className="text-xs">
                              {moment(
                                singleJob?.response?.jobDetail?.timeEnd
                              ).format("YYYY-MM-DD")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <p className="text-xs font-medium">Trạng thái</p>
                    {priorities.map((item) =>
                      item?.id === singleJob?.response?.priority ? (
                        <p className={`text-xs font-bold ${item.color}`}>
                          {item.name}
                        </p>
                      ) : (
                        <></>
                      )
                    )}
                  </div>
                  <div className="information-plan mt-2 flex justify-between">
                    <span className="text-sm font-medium">
                      Tên công việc:{" "}
                      <span className="text-red-400">
                        {singleJob?.response?.title}
                      </span>
                    </span>
                  </div>
                  <div className="information-plan mt-2 text-sm">
                    <span>Mô tả công việc</span>
                    <div className="text-sm">
                      <p>{singleJob?.response?.jobDetail.description}</p>
                    </div>
                  </div>
                </div>
                <div className="h-full">
                  <span className="text-xs font-medium">Người thực hiện</span>
                  <hr />
                  <div className="users-selection-list-wrapper py-2 h-72 overscroll-y-none overflow-y-auto overflow-hidden">
                    <div className="h-auto ">
                      <div className="users-item flex py-1 px-2 ">
                        <div className="avatar w-2/12 ">
                          <img
                            src="https://batterydown.vn/wp-content/uploads/2022/05/hinh-anh-avatar-de-thuong-cute-nhat.jpg"
                            alt=""
                            className=" w-8 h-8  rounded-full"
                          />
                        </div>
                        <div className="name w-8/12 my-auto">
                          <span className="text-xs ">Nguyễn Thị Ngọc Mai</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-full">
                  <form action="#" method="GET" className="">
                    <span className="text-xs font-medium">Đường dẫn File</span>
                    <hr />
                    <div className="relative mt-1">
                      <a href="#" className="underline text-xs">
                        {singleJob?.response?.jobDetail.additionInfo}
                      </a>
                    </div>
                    <div className="relative mt-1">
                      <span className="text-xs font-medium">
                        Người chịu trách nhiệm
                      </span>
                      <hr />
                      <span className="text-xs ">Nguyễn Thị Ngọc Mai</span>
                    </div>
                  </form>
                </div>
                <div className="h-full">
                  <p className="text-xs font-bold py-1">Báo cáo tiến độ</p>
                  <div className="h-80 overflow-y-auto overflow-hidden">
                    <div className="py-1">
                      <hr />
                      <div className="relative mt-1">
                        <span className="text-xs">
                          <span className="text-xs font-medium">Mô tả: </span>
                          {singleJob?.response?.jobDetail.note}
                        </span>
                      </div>
                      <div className="relative mt-1">
                        <span className="text-xs">
                          <span className="text-xs font-medium">Tiến độ thực hiện: </span>
                          {singleJob?.response?.jobDetail.verifyLink}
                        </span>
                      </div>
                      <div className="relative mt-1">
                        <span className="text-xs">
                          <span className="text-xs font-medium">Đường link dẫn chứng: </span>
                          {singleJob?.response?.kpi}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="items-center p-6 border-gray-200 rounded-b text-right">
                <button
                  className="me-2 bg-red-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-sm  text-sm px-5 py-1.5 text-center"
                  type="button"
                  onClick={() => {
                    if (window.confirm("Bạn có muốn xóa công việc này")) {
                      dispatch(deleteJob(String(singleJob.response.id))).then(
                        (resp) => {
                          if (!resp?.error) {
                            nav("/task-list");
                          }
                        }
                      );
                    }
                  }}
                >
                  Xóa
                </button>
                <Link to={"/task-list"}
                  className=" bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-sm  text-sm px-5 py-1.5 text-center"
                  
                >
                  Đóng
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </LayoutTask>
  );
}

export default DetailTask;
