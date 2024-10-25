import React from "react";
import Nav from "./Nav";
import { Spinner } from "@material-tailwind/react";

function Loading() {
  return (
    <>
      <Nav />
      <div className="flex justify-center items-center h-screen ">
        <Spinner color="green" className="w-15 h-15 text-emerald-400" />
      </div>
    </>
  );
}

export default Loading;
