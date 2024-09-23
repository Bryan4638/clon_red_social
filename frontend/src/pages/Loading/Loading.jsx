import React from "react";
import Nav from "./Nav";

function Loading() {
  return (
    <>
      <Nav />
      <div className="flex justify-center h-screen ">
        <div className="w-full lg:w-2/3 xl:w-2/5 pt-32 lg:pt-16 px-2">
          <h1 className="">Loading...</h1>
        </div>
      </div>
    </>
  );
}

export default Loading;
