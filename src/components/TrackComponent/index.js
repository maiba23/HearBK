import React from "react";
import cx from "classnames";
import { TRACK_STATUS } from "./constants";
import NoTrackFound from "./NoTrackFound";
import CustomFloatingButton from "../../common/CustomFloatingButton";
import TrackCard from "./TrackCard";
import "./track.styles.scss";
import CustomSliderTab from "../../common/CustomSliderTab";
import { trackMixpanel } from "../../mixpanel";

const TrackComponent = ({ selectedStatus, trackList, handleOnStatusChange, handleOnClickAddTrack, handleOnTrackClick }) => {
  return (
    <>
      <div className="track-status-container">
        <div className="status-button-container">
          <CustomSliderTab value={selectedStatus?.value} tabList={TRACK_STATUS} handleOnChange={handleOnStatusChange} />
        </div>
      </div>
      {!!trackList?.length && <span className="track-container-header">Your tracks</span>}
      {trackList?.length ? (
        <div className="view-status-container">
          {trackList.map((trackItem) => (
            <TrackCard
              onClick={() => {
                handleOnTrackClick(trackItem);
              }}
              key={trackItem._id}
              trackCoverUrl={trackItem?.trackCoverUrl}
              name={trackItem.track_title}
              status={trackItem.status}
              uploadStatus={trackItem?.upload_status}
              noOfRating={trackItem.review_count || 0}
            />
          ))}
        </div>
      ) : (
        <div className="view-status-container-1">
          <NoTrackFound />
        </div>
      )}
      <div className="floating-add-button">
        <CustomFloatingButton onClick={handleOnClickAddTrack}>
          <span className="add-button">+</span>
        </CustomFloatingButton>
      </div>
    </>
  );
};

export default TrackComponent;
