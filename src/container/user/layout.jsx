import KPI from "./kpi";
import ManagerKPI from "./kpi/managerKPI";
import Footer from "./layout/footer";
import Header from "./layout/header";
import Profile from "./profile";
import Account from "./profile/account";
import ManagerUsers from "./profile/managerUsers";
import TaskBoard from "./tasks/taskBoard";
import TaskList from "./tasks/taskList";

function Layout({children}) {
    return ( 
        <div className="bg-blue-50 pt-36 sm:pt-28 min-h-screen px-3 lg:px-0">
            <Header />
            <div className=" w-full m-auto max-w-screen-xl ">
            {children}
            </div>
            
            <Footer />
        </div>
     );
}

export default Layout;