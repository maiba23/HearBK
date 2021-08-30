import React from "react";
import "./loader.scss";

const Loader = () => {
  return (
    <div className="ball-loader">
      <div className="ball-loader-ball ball1"></div>
      <div className="ball-loader-ball ball2"></div>
      <div className="ball-loader-ball ball3"></div>
    </div>
  );
};

export default Loader;
