import AccountManager from "./account/accountmanager";
import NavAdmin from "./layout/header";
import SideBar from "./layout/sidebar";

function LayoutAdmin({children}) {
  return (
    <>
      <NavAdmin />
      <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
        <SideBar />
        <div
          id="main-content"
          className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900"
        >
          <main>
          {children}
          </main>
        </div>
      </div>
    </>
  );
}

export default LayoutAdmin;
