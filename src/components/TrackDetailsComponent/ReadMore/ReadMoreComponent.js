import React from "react";
import "./readMore.style.scss";
import { ReactComponent as Clear } from "../../../assets/img/musician/clear input.svg";
import Rating from "../../../common/Rating";
import content from "../content";
import { computeInfluencerFeedbackRating, formatDate } from "../../../utils";
import commentUserImage from "../../../assets/img/default-user-pic.png";

export default function ReadMoreComponent({
  handleClose,
  listenerUserName,
  listenerUserImage,
  submittedOn,
  trackRating,
  promoteToSocialMedia,
  addToPlayList,
  trackFeedback,
  influencerFeedback,
}) {
  return (
    <div className="read-more-container">
      <div className="read-more-header-container">
        <Clear onClick={handleClose} />
      </div>

      <div className="read-more-main-container">
        <div className="comment-heading">
          <img src={listenerUserImage || commentUserImage} alt="" />
          <div className="user-info">
            <div className="username">{listenerUserName}</div>
            <div className="comment-date">{formatDate(submittedOn)}</div>
          </div>
        </div>

        <div className="track-rating">
          <div className="track-rating-title">{content.COMMENT_RATING_TITLE}</div>
          <Rating onClick={() => {}} rating={trackRating} />
        </div>
        <div className="track-promote-playlist">
          <div className="track-promote-playlist-key">{content.COMMENT_WILL_PROMOTE}</div>
          <div className="track-promote-playlist-value">{promoteToSocialMedia ? "Yes" : "No"}</div>
        </div>
        <div className="track-promote-playlist">
          <div className="track-promote-playlist-key">{content.COMMENT_WILL_PLAYLIST}</div>
          <div className="track-promote-playlist-value">{addToPlayList ? "Yes" : "No"}</div>
        </div>
        <div className="track-detail-comment-text">{trackFeedback}</div>
        {influencerFeedback && (
          <>
            <div className="artist-feedback">
              <div className="subtitle">Artist feedback</div>
              <div className="feedback">{influencerFeedback?.comment}</div>
            </div>

            <div className="influencer-feedback">
              <div className="subtitle">Review Rating</div>
              <Rating onClick={() => {}} rating={computeInfluencerFeedbackRating(influencerFeedback)} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
