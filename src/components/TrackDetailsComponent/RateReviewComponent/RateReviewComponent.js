import React from "react";
import "./rateReview.style.scss";
import { ReactComponent as Clear } from "../../../assets/img/musician/clear input.svg";
import Rating from "../../../common/Rating";
import Button from "../../../common/Button";

export default function RateReviewComponent({
  handleClose,
  commentRef,
  reviewQuality,
  responseTime,
  requestRecommend,
  handleReviewQuality,
  handleResponseTime,
  handleRequestRecommend,
  handleSubmit,
}) {
  const showBtn = !!reviewQuality && !!responseTime && !!requestRecommend;

  return (
    <div className="rate-review-container">
      <div className="rate-review-header-container">
        <Clear onClick={handleClose} />
      </div>
      <div className="rate-review-main-container">
        <div className="rate-review-title">Rate a review</div>

        <div className="rate-review-subtitle">Review quality</div>
        <Rating width={34} rating={reviewQuality} onClick={handleReviewQuality} />

        <div className="rate-review-subtitle">Response time</div>
        <Rating width={34} rating={responseTime} onClick={handleResponseTime} />

        <div className="rate-review-subtitle">Request again & recommend</div>
        <Rating width={34} rating={requestRecommend} onClick={handleRequestRecommend} />

        <div className="rate-review-subtitle comment">Comment a review</div>
        <textarea className="rate-review-comment" ref={commentRef}></textarea>

        <div className="rate-review-actions">
          {!showBtn && <Button className="rate-review-button-alt" buttonText="DONE" />}
          {showBtn && <Button onClick={handleSubmit} className="rate-review-button" buttonText="DONE" />}
        </div>
      </div>
    </div>
  );
}
