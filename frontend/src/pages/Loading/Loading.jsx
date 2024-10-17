import React from "react";
import Nav from "./Nav";
import { Spinner } from "@material-tailwind/react";

function Loading() {
  return (
    <>
      <Nav />
      <div className="flex justify-center items-center h-screen ">
        <Spinner color="blue" className="w-15 h-15 text-cyan-200" />
      </div>
    </>
  );
}

export default Loading;
