import React from "react";

function Loader() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <div className="spinner">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}

export default Loader;
