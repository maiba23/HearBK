import { Drawer } from "@material-ui/core";
import React from "react";
import ReadMoreComponent from "../../components/TrackDetailsComponent/ReadMore/ReadMoreComponent";

export default function ReadMoreReview({ open, handleClose, reviewItem }) {
  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      {reviewItem?.isRequest && (
        <ReadMoreComponent
          listenerUserName={reviewItem?.review?.influencer_details?.display_name}
          listenerUserImage={reviewItem?.review?.influencer_details?.profile_image}
          submittedOn={reviewItem?.review?.influencer_review?.submittedOn}
          trackRating={reviewItem?.review?.influencer_review?.trackRating}
          promoteToSocialMedia={reviewItem?.review?.influencer_review?.promoteToSocialMedia}
          addToPlayList={reviewItem?.review?.influencer_review?.addToPlayList}
          trackFeedback={reviewItem?.review?.influencer_review?.trackFeedback}
          influencerFeedback={reviewItem?.review?.influencer_feedback || false}
          handleClose={handleClose}
        />
      )}
      {!reviewItem?.isRequest && (
        <ReadMoreComponent
          listenerUserName={reviewItem?.review?.listenerUserName}
          listenerUserImage={reviewItem?.review?.listener_details?.profile_image}
          submittedOn={reviewItem?.review?.submittedOn}
          trackRating={reviewItem?.review?.trackRating}
          promoteToSocialMedia={reviewItem?.review?.promoteToSocialMedia}
          addToPlayList={reviewItem?.review?.addToPlayList}
          trackFeedback={reviewItem?.review?.trackFeedback}
          handleClose={handleClose}
        />
      )}
    </Drawer>
  );
}
