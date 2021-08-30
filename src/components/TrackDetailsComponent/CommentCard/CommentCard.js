import React from "react";
import "./commentCard.style.scss";
import commentUserImage from "../../../assets/img/default-user-pic.png";
import content from "../content";
import LinesEllipsis from "react-lines-ellipsis";
import { computeInfluencerFeedbackRating, formatDate } from "../../../utils";
import Button from "../../../common/Button";
import Rating from "../../../common/Rating";

const CommentCard = ({
  listenerUserName,
  listenerUserImage,
  submittedOn,
  trackRating,
  promoteToSocialMedia,
  addToPlayList,
  trackFeedback,
  hideReview,
  showRateReview,
  onRateReviewClicked,
  influencerFeedback,
  onReadMoreClick,
}) => {
  return (
    <div className="track-details-comment-card">
      <div className="comment-heading">
        <img src={listenerUserImage || commentUserImage} alt="" />
        <div className="user-info">
          <div className="username">{listenerUserName}</div>
          <div className="comment-date">{formatDate(submittedOn)}</div>
        </div>
      </div>
      {hideReview && (
        <div className="track-review-pending">
          <div className="pending">Pending</div>
        </div>
      )}
      {!hideReview && (
        <>
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
          <div className="track-detail-comment-text">
            <LinesEllipsis
              text={trackFeedback || ""}
              maxLine={3}
              style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }} // Chrome70+ version issue fix
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </div>
          <div onClick={onReadMoreClick} className="track-detail-comment-read-more">
            {content.COMMENT_READ_MORE}
          </div>
          {influencerFeedback && (
            <div className="influencer-feedback">
              <div className="subtitle">Review Rating</div>
              <Rating onClick={() => {}} rating={computeInfluencerFeedbackRating(influencerFeedback)} />
            </div>
          )}

          {showRateReview && !influencerFeedback && (
            <div className="rate-review-button">
              <Button onClick={onRateReviewClicked} className="rate-review" buttonText="Rate Review"></Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommentCard;
