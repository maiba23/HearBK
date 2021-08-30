import React from "react";
import "./trackInfoCard.style.scss";

const TrackInfoCard = ({ count, title, description }) => {
  return (
    <div className="track-info-card">
      <div className="track-info-card-count">{count}</div>
      <div className="track-info-card-title">{title}</div>
      <div className="track-info-card-description">{description}</div>
    </div>
  );
};

export default TrackInfoCard;
