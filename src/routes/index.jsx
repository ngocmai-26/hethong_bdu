import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../container/auth/login";
import ForgotPassword from "../container/auth/forgot_password";
import Account from "../container/user/profile/account";
import ManagerUsers from "../container/user/profile/managerUsers";
import ManagerKPI from "../container/user/kpi/managerKPI";
import TaskList from "../container/user/tasks/taskList";
import TaskBoard from "../container/user/tasks/taskBoard";
import DashBoard from "../container/user/dashboard";
import KPI from "../container/user/kpi";
import ListKPI from "../container/user/kpi/List_KPI";
import EvaluateKPI from "../container/user/kpi/evaluate_kpi";
import LayoutAdmin from "../container/admin/layout";
import "../asset/js/js.js";
import RequestKPI from "../container/user/kpi/requestKPI.jsx";
import ListNote from "../container/user/note/list_note.jsx";
import DetailTask from "../container/user/tasks/detailTask.jsx";
import Target from "../container/user/kpi/target.jsx";
import NoteDone from "../container/user/note/note_done.jsx";
import Expertise from "../container/user/kpi/expertise.jsx";
import Category from "../container/admin/category/index.jsx";
import AccountManager from "../container/admin/account/accountmanager.jsx";
import CategoryKPI from "../container/admin/kpicategory/index.jsx";
import CategoryTarget from "../container/admin/roles/index.jsx";
import { useSelector } from "react-redux";
import { useLayoutEffect } from "react";
import JobManager from "../container/user/tasks/jobmanager.jsx";
import RolesDetail from "../container/admin/roles/roles-detail.jsx";
import KPICateDetail from "../container/admin/kpicategory/kpi-cate-detail.jsx";
import ConfirmPassword from "../container/auth/confirm_password.jsx";
import KPIManager from "../container/admin/kpimanager/index.jsx";
import KPIManagerDetail from "../container/admin/kpimanager/kpi-manager-detail.jsx";
import AdminJobManager from "../container/admin/jobsmanager/index.jsx";

  
export const GeneralRoute = () => {
  
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      <Route path="/category-target" element={<CategoryTarget />}></Route>
      <Route path="/confirm-password" element={<ConfirmPassword />}></Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};
export const LoggedRoute = () => {
  const role = JSON.parse(localStorage.getItem('auth_role'))


  return (
    <Routes>
      <Route path="/" element={role?.id === 1? <AccountManager />: <DashBoard />}></Route>
      <Route path="/profile" element={<Account />}></Route>
      <Route path="/manager-users" element={<ManagerUsers />}></Route>
      <Route path="/manager-kpi" element={<ManagerKPI />}></Route>
      <Route path="/danh-gia-kpi" element={<EvaluateKPI />}></Route>
      <Route path="/danh-sach-kpi" element={<ListKPI />}></Route>
      <Route path="/task-list" element={<TaskList />}></Route>
      <Route path="/task-board" element={<TaskBoard />}></Route>
      <Route path="/account" element={<AccountManager />}></Route>
      <Route path="/request-kpi" element={<RequestKPI />}></Route>
      <Route path="/note-list" element={<ListNote />}></Route>
      <Route path="/jobs/:id" element={<DetailTask />}></Route>
      <Route path="/target" element={<Target />}></Route>
      <Route path="/roles/:id" element={<RolesDetail />}></Route>
      <Route path="/note-done" element={<NoteDone />}></Route>
      <Route path="/expertise" element={<Expertise />}></Route>
      <Route path="/permissions" element={<Category />}></Route>
      <Route path="/kpi_categories" element={<CategoryKPI />}></Route>
      <Route path="/kpi_manager" element={<KPIManager />}></Route>
      <Route path="/kpis/:id" element={<KPIManagerDetail />}></Route>
      <Route path="/kpi_categories_detail/:id" element={<KPICateDetail />}></Route>
      <Route path="/category-role" element={<CategoryTarget />}></Route>
      <Route path="/quan-ly-bao-cao-cong-viec" element={<JobManager />}></Route>
      <Route path="/jobs-manager" element={<AdminJobManager />}></Route>
      <Route path="*" element={role?.id === 1?  <AccountManager />: <DashBoard />}></Route>
    </Routes>
  );
};
function Router() {
  const { logged } = useSelector((state) => state.authReducer);;
  

  useLayoutEffect(() => {}, [logged]);
  return (
    <BrowserRouter>
      {!logged ? <GeneralRoute /> : <LoggedRoute />}
      {/* <LoggedRoute /> */}
    </BrowserRouter>
  );
}

export default Router;
