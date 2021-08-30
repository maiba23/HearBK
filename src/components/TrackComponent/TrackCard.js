import React from "react";
import DefaultTrackIcon from "../../assets/img/dashboard/default-track.png";
import TickIcon from "../../assets/img/tick.png";
import PlayIcon from "../../assets/img/play.png";
import "./track.styles.scss";
import { TRACK_STATUS } from "./constants";

const TrackCard = ({ name, status, noOfRating, onClick, trackCoverUrl, uploadStatus }) => {
  const isCompleted = status === TRACK_STATUS[2].value;
  const statusName = TRACK_STATUS.find((el) => el.value === status)?.name || "";
  return (
    <div onClick={onClick} style={{ background: `url(${trackCoverUrl || DefaultTrackIcon})` }} className="track-card-root-container">
      <div className="track-info-container">
        <span className="track-name">{name}</span>
        <div
          className="status-div-container"
          style={isCompleted ? { backgroundColor: "#42AE55" } : uploadStatus === "FAILED" ? { backgroundColor: "#cd4242" } : {}}
        >
          <img src={isCompleted ? TickIcon : PlayIcon} className={isCompleted ? "status-tick-icon" : "status-play-icon"} alt="play-icon" />
          <span className="status-span-container">{uploadStatus === "FAILED" ? "Track Upload Failed" : statusName}</span>
        </div>
        {Boolean(noOfRating) && (
          <div className="rating-container">
            <div className="span-image-container">
              <img src={TickIcon} alt="tick-icon" />
            </div>
            <span className="rating-text">{noOfRating}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackCard;
