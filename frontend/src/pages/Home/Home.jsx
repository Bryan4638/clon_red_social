import { useEffect } from "react";
import Cookies from "js-cookie";
import SideBar from "./SideBar/left/SideBar";
import Listpost from "./Post/Listpost";

function Home() {
  useEffect(() => {
    const cooke = Cookies.get();
    //console.log(cooke);
  }, []);

  return (
    <>
      <div className="flex justify-center h-screen ">
        <div className="w-1/5 pt-16 h-full hidden xl:flex flex-col fixed top-0 left-0 scrollbar-hide">
          <SideBar/>
        </div>

        <div className="w-full lg:w-2/3 xl:w-2/5 pt-32 lg:pt-16  px-2">
        <Listpost/>
        </div>

        {/* <div className="w-1/5 pt-16 h-full hidden xl:block px-4 fixed top-0 right-0">
        {% if user.is_authenticated %}
        {% block right_sidebar %}{% endblock right_sidebar %}
        {% endif %}
        </div> */}

     </div>
    </>
  );
}

export default Home;
