import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LayoutTask from ".";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { deleteRole } from "../../../thunks/RoleThunk";
import { deleteJob, getJobById } from "../../../thunks/JobsThunk";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect } from "react";
import { priorities, statusList } from "../../../constants/fakedata";

function DetailTask() {
  const { id } = useParams();
  const { singleJob} = useSelector((state) => state.jobsReducer);
  const nav = useNavigate();
  const dispatch = useDispatch();
  console.log(id)
  useLayoutEffect(() => {
    if (id) {
      dispatch(getJobById(String(id)));
    }
  }, []);
  console.log(singleJob)
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
                        {statusList.map((item, key)=> item?.id === singleJob?.response?.status? <span className={`text-xs font-bold ${item.color}`} key={key}>{item.name}</span>: <></>)}
                        
                      </div>
                      <div className="col-span-3">
                        <div className="grid grid-cols-2">
                          <div>
                            <p className="text-xs">Thời gian bắt đầu :</p>
                            <p className="text-xs">16/10/2023</p>
                          </div>
                          <div>
                            <p className="text-xs">Thời gian kết thúc :</p>
                            <p className="text-xs">16/10/2023</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <p className="text-xs font-medium">Trạng thái</p>
                    {priorities.map((item)=> item?.id === singleJob?.response?.priority? <p className={`text-xs font-bold ${item.color}`}>{item.name}</p>: <></>)}
                    
                  </div>
                  <div className="information-plan mt-2 flex justify-between">
                    <span className="text-base font-medium">
                      {singleJob?.response?.title}
                    </span>
                  </div>
                  <div className="information-plan mt-2">
                    <div className="text-sm">
                      <p>- Lập trình UI task </p>
                      <p>- Tiếp tục Clothes </p>
                      <p>- Test web/ lam web </p>
                      <p>- Đánh giá học sinh </p>
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
                  <span className="text-xs font-medium">
                    Người chịu trách nhiệm
                  </span>
                  <hr />
                  <span className="text-xs ">Nguyễn Thị Ngọc Mai</span>
                </div>
                <div className="h-full">
                  <form action="#" method="GET" className="">
                    <span className="text-xs font-medium">Đường dẫn File</span>
                    <hr />
                    <div className="relative mt-1">
                      <a href="#" className="underline text-xs">aaaa</a>
                    </div>
                    <span className="text-xs font-medium">Link liên hệ</span>
                    <hr />
                    <div className="relative mt-1">
                      <a href="">
                        <span className="text-xs ">
                          ngocmai262626@gmail.com
                        </span>
                      </a>
                    </div>
                  </form>
                </div>
                <div className="h-full">
                  <p className="text-xs font-bold py-1">Báo cáo tiến độ</p>
                  <div className="h-80 overflow-y-auto overflow-hidden">
                    <div className="py-1">
                      <span className="text-xs font-medium">
                        Ngày: 11/11/2023
                      </span>
                      <hr />
                      <div className="relative mt-1">
                        <span className="text-xs">
                          Qua bài viết này chúng tôi đã hướng dẫn bạn cách lấy
                          ngày giờ hiện tại – current Date Time bằng javascript.
                          Nếu có bất kỳ đóng góp nào bạn có thể để lại bình luận
                          ở bên dưới. Bạn cũng có thể tham khảo thêm các dịch vụ
                          Web Hosting, Cloud VPS, Email Business do chúng tôi
                          cung cấp hoặc xem các bài viết chia sẻ khác của chúng
                          tôi tại đây
                        </span>
                      </div>
                    </div>
                    <div className="py-1">
                      <span className="text-xs font-medium">
                        Ngày: 11/11/2023
                      </span>
                      <hr />
                      <div className="relative mt-1">
                        <span className="text-xs">
                          Qua bài viết này chúng tôi đã hướng dẫn bạn cách lấy
                          ngày giờ hiện tại – current Date Time bằng javascript.
                          Nếu có bất kỳ đóng góp nào bạn có thể để lại bình luận
                          ở bên dưới. Bạn cũng có thể tham khảo thêm các dịch vụ
                          Web Hosting, Cloud VPS, Email Business do chúng tôi
                          cung cấp hoặc xem các bài viết chia sẻ khác của chúng
                          tôi tại đây
                        </span>
                      </div>
                    </div>
                    <div className="py-1">
                      <span className="text-xs font-medium">
                        Ngày: 11/11/2023
                      </span>
                      <hr />
                      <div className="relative mt-1">
                        <span className="text-xs">
                          Qua bài viết này chúng tôi đã hướng dẫn bạn cách lấy
                          ngày giờ hiện tại – current Date Time bằng javascript.
                          Nếu có bất kỳ đóng góp nào bạn có thể để lại bình luận
                          ở bên dưới. Bạn cũng có thể tham khảo thêm các dịch vụ
                          Web Hosting, Cloud VPS, Email Business do chúng tôi
                          cung cấp hoặc xem các bài viết chia sẻ khác của chúng
                          tôi tại đây
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
                      dispatch(deleteJob(String(singleJob.response.id))).then((resp) => {
                        if (!resp?.error) {
                          nav("/task-list");
                        }
                      });;
                    }
                  }}
                >
                  Xóa
                </button>
                <button
                  className=" bg-blue-500 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-sm  text-sm px-5 py-1.5 text-center"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </LayoutTask>
  );
}

export default DetailTask;
