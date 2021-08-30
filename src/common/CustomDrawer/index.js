import React from "react";
import Drawer from "@material-ui/core/Drawer";

const CustomDrawer = ({ open, handleOnClose = null, children }) => {
  return (
    <Drawer anchor={"right"} open={open} onClose={handleOnClose}>
      {children}
    </Drawer>
  );
};

export default CustomDrawer;
