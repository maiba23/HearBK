import React from "react";
import "./customButton.style.scss";

const CustomFloatingButton = ({ children, ...props }) => (
  <div className="button-root-container" {...props}>
    {children}
  </div>
);

export default CustomFloatingButton;
