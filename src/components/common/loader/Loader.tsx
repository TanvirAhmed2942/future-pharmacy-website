import React from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
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
