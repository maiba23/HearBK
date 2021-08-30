import React from "react";
import "./influencerWaitingCard.style.scss";
import verified from "../../../assets/icon/verifeied.svg";
import content from "../content";

const InfluencerWaitingCard = ({ waitingInfluencer, description, handleRequestReview }) => {
  return (
    <div className="influencer-waiting-card">
      <div className="influencer-waiting-card-wrapper">
        <div className="influencer-waiting-card-title">
          <img src={verified} alt="" />
          <span>
            {waitingInfluencer} {content.INFLUENCER_WAITING_TITLE}
          </span>
        </div>
        <div className="influencer-description-and-action">
          <div className="influencer-waiting-card-description">{description}</div>
          {!!waitingInfluencer && (
            <div onClick={handleRequestReview} className="request-button">
              <span className="request-review-txt">{content.INFLUENCER_REQUEST_REVIEW}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfluencerWaitingCard;
