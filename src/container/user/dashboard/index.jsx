import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../layout";
import { faClipboardList, faUsers } from "@fortawesome/free-solid-svg-icons";

function DashBoard() {
  return (
    <Layout>
      <div className="header-dashboard ">
        <div className="title py-3">
          <a href="#" className="text-xl font-medium text-slate-500">
            Dashboard
          </a>
        </div>

      </div>
      <div className="content-dashboard">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            <div className="stack-item border-2 bg-white w-full p-3">
                <div className="icon pb-3">
                    <FontAwesomeIcon icon={faUsers} className="text-xl text-slate-400" />
                </div>
                <div className="stack-content">
                    <p className="text-3xl leading-9">9</p>
                </div>
                <div className="text-xs font-medium text-slate-400">Total Users</div>
            </div>
            <div className="stack-item border-2 bg-white w-full p-3">
                <div className="icon pb-3">
                    <FontAwesomeIcon icon={faClipboardList} className="text-xl text-slate-400" />
                </div>
                <div className="stack-content">
                    <p className="text-3xl leading-9">9</p>
                </div>
                <div className="text-xs font-medium text-slate-400">Total Tasks</div>
            </div>
            <div className="stack-item border-2 bg-white w-full p-3">
                100
            </div>
        </div>
      </div>
    </Layout>
  );
}

export default DashBoard;
