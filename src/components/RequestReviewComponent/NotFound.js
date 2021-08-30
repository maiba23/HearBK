import React from "react";
import EmptyIcon from "../../assets/img/dashboard/empty.png";
import "./requestReview.style.scss";
import content from "./content";

const NotFound = () => (
  <div className="not-found-container">
    <img src={EmptyIcon} alt="empty-icon" />
    <div className="not-found-text">{content.NOT_FOUND_MESSAGE}</div>
  </div>
);

export default NotFound;
