import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../layout";

function Profile({children}) {
  const role = JSON.parse(localStorage.getItem('auth_role'))

  return (
    <Layout>
      <div className="header-task ">
        <div className="title py-3">
          <a href="#" className="text-xl font-medium text-slate-500">
            Cài đặt
          </a>
        </div>
        <div className="content">
          <div className="grid grid-cols-6 gap-5">
            <div>
              <div className="bg-white p-2">
                <div className="text-xs text-slate-400 font-medium py-2">
                  Thông tin cá nhân
                </div>
                <div className="avatar">
                  <img
                    src="https://nhadepso.com/wp-content/uploads/2023/03/cap-nhat-99-hinh-anh-avatar-gau-cute-de-thuong-ngo-nghinh_1.jpg"
                    alt=""
                    className="w-2/4 h-28 object-fit cover rounded-full m-auto"
                  />
                </div>
                <div className="name pt-2 text-center">
                  <span className="text-sm">Nguyen Thi Ngoc Mai</span>
                </div>
              </div>
            </div>
            <div className="col-span-5 bg-white">
              <div className="header p-3 bg-gray-100 border-b-2">
                <ul className="flex">
                  <li className="px-2">
                    <Link to='/profile' className="text-xs font-medium">
                      Cài đặt của tôi
                    </Link>
                  </li>
                  {
                    role.id === 3? (
                      <li className="px-2">
                    <Link to='/manager-users' className="text-xs font-medium">
                      Quản lý nhân viên
                    </Link>
                  </li>
                    ): (<></>)
                  }
                  
                </ul>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
