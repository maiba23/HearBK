import React from "react";
import EmptyIcon from "../../assets/img/dashboard/empty.png";
import "./track.styles.scss";

const NoTrackFound = () => (
  <div className="no-track-container">
    <img src={EmptyIcon} alt="empty-icon" />
    <span className="no-track-span-text">
      You have no tracks in the queue:-(
    </span>
    <span className="no-track-span-text">Upload one to begin!</span>
  </div>
);

export default NoTrackFound;
