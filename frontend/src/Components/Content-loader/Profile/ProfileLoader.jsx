import { Spinner } from "@material-tailwind/react";
import React from "react";

function ProfileLoader() {
  return (
    <div className="w-full py-0 h-screen hide-scrollbar overflow-y-scroll">
     <Spinner/>
    </div>
  );
}

export default ProfileLoader;
