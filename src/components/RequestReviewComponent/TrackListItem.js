import React from "react";
import { toast } from "react-toastify";
import CustomCheckbox from "../../common/CustomCheckBox";
import testImg from "../../assets/img/dashboard/default-track.png";
import content from "./content";

const TrackListItem = ({ selected, title, likes, amount, image, onCheckBoxClicked, requiredReviewRating, approvalRating }) => {
  const neededLikes = requiredReviewRating;
  console.log(approvalRating)
  const disabled = approvalRating === undefined ? true : approvalRating < requiredReviewRating;

  const handleCheckBoxClicked = () => {
    if (disabled) {
      //toast.error(`Your track must have at least ${neededLikes} likes!`);
    } else {
      onCheckBoxClicked();
    }
  };

  return (
    <div className={`track-list-item-container ${disabled ? "disabled" : ""}`}>
      <aside className="track-list-item-left-container">
        <div className="track-list-item-check-box">
          <CustomCheckbox onClick={handleCheckBoxClicked} selected={selected} />
        </div>
        <img className="track-list-item-image" src={image || testImg} alt="" />
        <div className="track-list-item-description">
          <div className="track-list-item-title">{title}</div>
          <div className="likes">
            {`${content.QUALITY_CONTROL}  ${approvalRating || 0} %`}
          </div>
        </div>
      </aside>
      <aside className="track-list-item-amount">
        <div className="track-review-amount">${amount}</div>
      </aside>
    </div>
  );
};

export default TrackListItem;
