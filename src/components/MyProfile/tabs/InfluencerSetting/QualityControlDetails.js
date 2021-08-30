import { Drawer } from "@material-ui/core";
import React from "react";
import { ReactComponent as Clear } from "../../../../assets/img/musician/clear input.svg";

export default function QualityControlDetails({ open, handleClose }) {
  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <div className="quality-control-container">
        <div className="quality-control-header-container">
          <Clear onClick={handleClose} />
        </div>
        <div className="quality-control-main-container">
          <div className="quality-control-title">Quality Control Filter</div>
          <div className="quality-control-details">
            In order to control the volume and quality of direct requests you receive, please set your filter.
            <br />
            <br />
            In the app, we create a Queue for each person comprised of music and filtered to only show the genres marked as a favorite
            during the registration process.
            <br />
            <br />
            Each track in the queue is rated from 0 stars to 5 stars. So, you should set your filter based on how many people out of 100
            rated the track with at least 3 stars, which we consider to be a Like.
          </div>
        </div>
      </div>
    </Drawer>
  );
}
