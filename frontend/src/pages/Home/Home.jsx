import SideBar from "./SideBar/left/SideBar";
import RsideBar from "./SideBar/right/SideBar";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="flex justify-center h-screen hide-scrollbar overflow-y-scroll ">
        <div className="w-1/5 pt-16 h-full hidden xl:flex flex-col fixed top-0 left-0">
          <SideBar />
        </div>

        <div className="w-full lg:w-2/3 xl:w-2/5 pt-32 lg:pt-16  px-2 ">
          <Outlet />
        </div>

        <div className="w-1/5 pt-16 h-full hidden xl:block px-4 fixed top-0 right-0">
          <RsideBar />
        </div>
      </div>
    </>
  );
}

export default Home;
