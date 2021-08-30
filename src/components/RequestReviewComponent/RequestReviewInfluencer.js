import React from "react";
import "./requestReview.style.scss";
import { ReactComponent as Clear } from "../../assets/img/musician/clear input.svg";
import NotFound from "./NotFound";
import Button from "../../common/Button";
import content from "./content";
import TrackListItem from "./TrackListItem";

export default function RequestReviewInfluencer({
  onClose,
  trackList,
  selectedTracks,
  handleTrackSelect,
  handleRequestReview,
  selectedUser,
}) {
  const showNotFound = !trackList?.length;
  const showRequestTrackButton = !!selectedTracks.length;
  const showSelectTrackButton = !selectedTracks.length && !!trackList?.length;
  const totalAmount = (selectedUser?.price || 0) * (selectedTracks?.length || 0);
  return (
    <div className="request-review-container">
      <div className="request-review-header-container">
        <Clear onClick={onClose} />
      </div>
      <div className="request-review-main-container">
        <div className="request-review-title">{content.REVIEW_REQUEST_TITLE}</div>
        <div className="request-review-subtitle">
          {`${content.REVIEW_REQUEST_SUBTITLE(selectedUser?.required_review_rating || 0)}`}
        </div>

        {!showNotFound && (
          <div className="track-list-container">
            {trackList.map((trackItem) => (
              <TrackListItem
                key={trackItem._id}
                selected={selectedTracks.includes(trackItem._id)}
                title={trackItem.track_title}
                approvalRating={trackItem?.approval_rating || 0}
                likes={trackItem.likes}
                image={trackItem.trackCoverUrl}
                requiredReviewRating={selectedUser?.required_review_rating || 0}
                amount={selectedUser?.price || 0}
                onCheckBoxClicked={() => handleTrackSelect(trackItem._id)}
              />
            ))}
          </div>
        )}

        <div className="request-review-actions">
          {showSelectTrackButton && (
            <Button onClick={() => { }} className="select-track-button" buttonText={content.SELECT_TRACK_BUTTON}></Button>
          )}
          {showRequestTrackButton && (
            <Button
              onClick={handleRequestReview}
              className="request-track-button"
              buttonText={content.REQUEST_TRACK_BUTTON(totalAmount)}
            ></Button>
          )}
        </div>
        {showNotFound && <NotFound />}
      </div>
    </div>
  );
}
