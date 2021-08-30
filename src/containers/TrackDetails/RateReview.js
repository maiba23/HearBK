import { Drawer } from "@material-ui/core";
import React from "react";
import { toast } from "react-toastify";
import RateReviewComponent from "../../components/TrackDetailsComponent/RateReviewComponent/RateReviewComponent";
import { trackMixpanel } from "../../mixpanel";
import mixpanel_constant from "../../mixpanel/mixpanel.constants";
import { rateInfluencerReview } from "../../state/actions/reviewActions";

export default function RateReview({ open, handleClose, selectedReviewForRating, fetchTrackdetails }) {
  const [reviewQuality, setReviewQuality] = React.useState(0);
  const [responseTime, setResponseTime] = React.useState(0);
  const [requestRecommend, setRequestRecommend] = React.useState(0);
  const commentRef = React.useRef(null);

  const handleSubmit = async () => {
    const payload = {
      review_quality: reviewQuality,
      response_time: responseTime,
      request_recommend: requestRecommend,
      comment: commentRef?.current?.value || "",
    };

    const reviewId = selectedReviewForRating?._id || "";

    trackMixpanel(mixpanel_constant.track_details_listener_give_review_feedback_submit, { ...selectedReviewForRating, ...payload });

    try {
      const res = await rateInfluencerReview(reviewId, payload);
      fetchTrackdetails();
      handleClose();
      setReviewQuality(0);
      setResponseTime(0);
      setRequestRecommend(0);
      trackMixpanel(mixpanel_constant.track_details_listener_give_review_feedback_success, { ...selectedReviewForRating, ...payload });
    } catch (err) {
      trackMixpanel(mixpanel_constant.track_details_listener_give_review_feedback_error, {
        ...selectedReviewForRating,
        ...payload,
        error: JSON.stringify(err),
      });
      toast.error("Unable to give rating to the review, please try again");
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <RateReviewComponent
        handleClose={handleClose}
        commentRef={commentRef}
        reviewQuality={reviewQuality}
        responseTime={responseTime}
        requestRecommend={requestRecommend}
        handleReviewQuality={val => setReviewQuality(val)}
        handleResponseTime={val => setResponseTime(val)}
        handleRequestRecommend={val => setRequestRecommend(val)}
        handleSubmit={handleSubmit}
      />
    </Drawer>
  );
}
