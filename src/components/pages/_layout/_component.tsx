import { Outlet } from "react-router-dom";
import Sidebar from "../../layout/sidebar/_component";

export const PageLayout = () => {
  return (
    <>
      <div>
        <div className="header"></div>
        <div className="main-content w-screen h-screen flex overflow-x-hidden">
          <Sidebar /> <Outlet />
        </div>
        <div className="footer"></div>
      </div>
    </>
  );
};
