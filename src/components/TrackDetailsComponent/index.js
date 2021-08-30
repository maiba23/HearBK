import React from "react";
import "./trackDetails.style.scss";
import arrowLeft from "../../assets/icon/arrow-left.svg";
import trackSetting from "../../assets/icon/track-settings.svg";
import TrackCard from "../TrackComponent/TrackCard";
import ReviewGoal from "./ReviewGoal/ReviewGoal";
import content from "./content";
import commentIcon from "../../assets/icon/comment.svg";
import uploadIcon from "../../assets/icon/uploads.svg";
import breakerIcon from "../../assets/icon/breaker.svg";
import bellIcon from "../../assets/img/dashboard/bell.svg";
import Button from "../../common/Button";
import TrackInfoCard from "./TrackInfoCard/TrackInfoCard";
import InfluencerWaitingCard from "./InfluencerWaitingCard/InfluencerWaitingCard";
import CommentCard from "./CommentCard/CommentCard";
import { TRACK_STATUS } from "../TrackComponent/constants";
import EditTrack from "../../containers/TrackDetails/EditTrack";
import PreviewAgain from "../../containers/TrackDetails/PreviewAgain";
import RequestReviewForTrack from "../../containers/TrackDetails/RequestReviewForTrack";
import FileDropper from "../../common/FileDropper";
import { UploadingState, UploadingFailedState, UploadingSuccessState } from "../AddTrackComponent/AddTrackComponent";
import deleteIcon from "../../assets/icon/delete.svg";
import ToggleSwitch from "../../common/ToggleSwitch";

const TrackDetailsComponent = ({
  selectedTrack,
  handleGoBack,
  showRequestReview,
  handleRequestReview,
  showEditTrack,
  handleEditTrack,
  showPreviewAgain,
  handlePreviewAgain,
  premiumUser,
  handleSubscribeToPro,
  handleSelectedReviewForRating,
  handleShowReadMoreReview,
  handleUpgradeTrack,
  onUploadMp3,
  selectedFile,
  uploadState,
  handleFileDrop,
  handleClearFile,
  cancelTrackUpload,
  handleCancelTrackUpload,
  toggleYearlySubscription,
  yearlySubscription,
}) => {
  const isCompleted = selectedTrack?.status === TRACK_STATUS[2].value;

  return (
    <>
      <UploadingState
        visible={!cancelTrackUpload && uploadState.uploadStart}
        onCancel={() => {
          handleCancelTrackUpload(true);
          handleClearFile();
        }}
        progress={uploadState?.uploadProgress}
      />
      <UploadingFailedState visible={selectedFile && !!uploadState?.uploadError} onTryAgain={onUploadMp3} />
      <UploadingSuccessState visible={!cancelTrackUpload && uploadState?.uploadComplete} />
      <div className="track-details-status-container">
        <div onClick={handleGoBack} className="back-to-track-action">
          <img src={arrowLeft} alt="" />
          <span>{content.TRACK_STATUS_BACK_ACTION}</span>
        </div>
        <div className="track-status-title">
          <span>{selectedTrack?.trackTitle}</span>
        </div>
        <div onClick={handleEditTrack} className="track-setting">
          <img src={trackSetting} alt="" />
        </div>
      </div>

      <section className="track-details-review-section">
        <TrackCard
          onClick={() => {}}
          trackCoverUrl={selectedTrack?.trackCoverUrl}
          name={selectedTrack?.trackTitle}
          status={selectedTrack?.status}
        />
        {selectedTrack?.uploadStatus !== "FAILED" && (
          <ReviewGoal
            progress={selectedTrack?.numberOfFeedbacksGiven || 0}
            total={selectedTrack?.numberOfFeedbacks || 100}
            isCompleted={isCompleted}
            handlePreviewAgain={handlePreviewAgain}
          />
        )}
        {selectedTrack?.uploadStatus === "FAILED" && (
          <div className="track-details-reupload-track">
            <div className="title">Your track is not previewing in the queue because your upload failed. </div>
            {uploadState?.uploadError && !selectedFile && <div className="subtitle-error">{uploadState?.uploadError}</div>}
            {!selectedFile && (
              <section className={`file-dropper`}>
                <FileDropper accept=".mp3" className="file-dropper-wrapper" onDrop={handleFileDrop}>
                  <div className="file-dropper-title">
                    Drag or <span>upload</span> file
                  </div>
                  <div className="file-dropper-subtitle">
                    You may attach up to 1 file under the size of <span>15MB</span>
                  </div>
                </FileDropper>
              </section>
            )}

            {selectedFile && (
              <section className="selected-file">
                <div onClick={handleClearFile} className="delete-selected-file">
                  <img src={deleteIcon} alt="" />
                </div>
                <aside className="selected-file-name">
                  <div className="selected-file-title">{selectedFile.name}</div>
                  {uploadState?.uploadError && <div className="selected-file-subtitle">{uploadState?.uploadError}</div>}
                </aside>
              </section>
            )}

            {selectedFile && (
              <div className="upload-button">
                <Button onClick={onUploadMp3} className="upload-track-button" buttonText="Upload Track" />
              </div>
            )}
          </div>
        )}
      </section>

      {selectedTrack?.uploadStatus !== "FAILED" && (
        <React.Fragment>
          <section className="track-details-cards">
            <TrackInfoCard
              count={selectedTrack?.promoters_count || 0}
              title={content.TRACK_PROMOTERS_TITLE}
              description={content.TRACK_PROMOTERS_DESCRIPTION}
            />
            <TrackInfoCard
              count={selectedTrack?.likes || 0}
              title={content.TRACK_LIKES_TITLE}
              description={content.TRACK_LIKES_DESCRIPTION}
            />
            <TrackInfoCard
              count={selectedTrack?.playlisters_count || 0}
              title={content.TRACK_PLAYLISTERS_TITLE}
              description={content.TRACK_PLAYLISTERS_DESCRIPTION}
            />
          </section>

          <section className="influencer-waiting-info">
            <TrackInfoCard
              count={(selectedTrack?.approval_rating || 0) + "%"}
              title={content.INFLUENCER_SCORE_TITLE}
              description={content.INFLUENCER_SCORE_DESCRIPTION}
            />
            <InfluencerWaitingCard
              waitingInfluencer={selectedTrack?.influencers_eligible || 0}
              handleRequestReview={handleRequestReview}
              description={
                selectedTrack?.influencers_eligible
                  ? content.INFLUENCER_WAITING_DESCRIPTION(selectedTrack?.approval_rating || 0, 100, selectedTrack?.influencers_eligible)
                  : content.INFLUENCER_NOT_AVAILABLE
              }
            />
          </section>
          {!!selectedTrack?.request_review?.length && (
            <section className="influencer-review-list">
              <div className="lists">
                {selectedTrack?.request_review?.map((item) => (
                  <CommentCard
                    key={item._id}
                    listenerUserName={item?.influencer_details?.display_name}
                    listenerUserImage={item?.influencer_details?.profile_image}
                    submittedOn={item?.influencer_review?.submittedOn}
                    trackRating={item?.influencer_review?.trackRating}
                    promoteToSocialMedia={item?.influencer_review?.promoteToSocialMedia}
                    addToPlayList={item?.influencer_review?.addToPlayList}
                    trackFeedback={item?.influencer_review?.trackFeedback}
                    influencerFeedback={item?.influencer_feedback || false}
                    hideReview={!item?.review_submitted}
                    showRateReview
                    onRateReviewClicked={() => handleSelectedReviewForRating(item)}
                    onReadMoreClick={() => handleShowReadMoreReview({ isRequest: true, review: item })}
                  />
                ))}
              </div>
            </section>
          )}

          <section className="track-detail-comments">
            <div className="track-detail-comments-header">
              <img src={commentIcon} alt="" />
              <div className="track-detail-comments-count">
                {selectedTrack?.review_count || 0} {content.COMMENT_NAME}
              </div>
            </div>
            <div className="track-detail-comments-tagline">
              {content.COMMENT_DESCRIPTION(selectedTrack?.numberOfFeedbacksGiven || 0, selectedTrack?.review_count || 0)}
              {!premiumUser && selectedTrack?.paymentToken === "CONNECT" && content.INFLUENCER_COMPLIMENTARY}
            </div>
            <div className="track-detail-comments-list">
              {selectedTrack?.reviews?.map((item) => (
                <CommentCard
                  key={item._id}
                  listenerUserName={item?.listenerUserName}
                  listenerUserImage={item?.listener_details?.profile_image}
                  submittedOn={item?.submittedOn}
                  trackRating={item?.trackRating}
                  promoteToSocialMedia={item?.promoteToSocialMedia}
                  addToPlayList={item?.addToPlayList}
                  trackFeedback={item?.trackFeedback}
                  onReadMoreClick={() => handleShowReadMoreReview({ isRequest: false, review: item })}
                />
              ))}
            </div>
          </section>
          {!premiumUser && selectedTrack?.paymentToken === "CONNECT" && (
            <section className="track-details-pricing">
              <div className="track-details-pricing-header">{content.PRICING_TITLE}</div>
              <div className="track-details-pricing-card-wrapper">
                <div>
                  <div className="track-details-pricing-card mr">
                    <div className="track-details-pricing-card-header">
                      <div className="type">{content.PRICING_TYPE_ONE_NAME}</div>
                      <div className="amount-wrapper">
                        <div className="amount"> {content.PRICING_TYPE_ONE_RATE}</div>
                        <ToggleSwitch checked={!yearlySubscription} onChange={toggleYearlySubscription} />
                      </div>
                      <div className="amount-wrapper">
                        <div className="amount"> $ 100 / year</div>
                        <ToggleSwitch checked={yearlySubscription} onChange={toggleYearlySubscription} />
                      </div>
                    </div>

                    <div className="track-details-pricing-card-content">
                      <div className="title">{content.PRICING_TYPE_ONE_FEATURE_APPLIES}</div>
                      <div className="description">{content.PRICING_TYPE_ONE_DESCRIPTION}</div>
                      <div className="text primary pb24">{content.PRICING_TYPE_ONE_FEATURE_1}</div>
                      <div className="text green">
                        <img src={uploadIcon} alt="" />
                        <span>{content.PRICING_TYPE_ONE_FEATURE_2}</span>
                      </div>
                      <div className="text">
                        <img src={breakerIcon} alt="" />
                        <span>{content.PRICING_TYPE_ONE_FEATURE_3}</span>
                      </div>
                      <div className="text pb24">
                        <img src={bellIcon} alt="" />
                        <span>{content.PRICING_TYPE_ONE_FEATURE_4}</span>
                      </div>

                      <div className="action">
                        <Button
                          onClick={handleSubscribeToPro}
                          className="pricing-action-button"
                          buttonText={content.PRICING_TYPE_ONE_ACTION_BUTTON}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="track-details-pricing-card alt">
                    <div className="track-details-pricing-card-header">
                      <div className="type">{content.PRICING_TYPE_TWO_NAME}</div>
                      <div className="amount"> {content.PRICING_TYPE_TWO_RATE}</div>
                    </div>
                    <div className="track-details-pricing-card-content">
                      <div className="title primary">{content.PRICING_TYPE_TWO_FEATURE_APPLIES}</div>
                      <div className="description">{content.PRICING_TYPE_TWO_DESCRIPTION}</div>
                      <div className="text pb24">
                        <span>{content.PRICING_TYPE_TWO_FEATURE_1}</span>
                      </div>

                      <div className="action">
                        <Button
                          onClick={handleUpgradeTrack}
                          className="pricing-action-button"
                          buttonText={content.PRICING_TYPE_TWO_ACTION_BUTTON}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </React.Fragment>
      )}

      <RequestReviewForTrack open={showRequestReview} handleClose={handleRequestReview} selectedTrack={selectedTrack} />
      <EditTrack open={showEditTrack} handleClose={handleEditTrack} selectedTrack={selectedTrack} />
      <PreviewAgain open={showPreviewAgain} handleClose={handlePreviewAgain} selectedTrack={selectedTrack} />
    </>
  );
};

export default TrackDetailsComponent;
