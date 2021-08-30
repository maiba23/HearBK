import React from "react";
import CircularProgress from "../CircularProgress/CircularProgress";
import "./reviewGoal.style.scss";
import content from "../content";
import Button from "../../../common/Button";

const ReviewGoal = ({ progress, isCompleted, handlePreviewAgain, total }) => {
  return (
    <div className="review-goal-container">
      <aside className="review-progress">
        <CircularProgress
          reduction={0}
          progress={progress}
          total={total}
          subtitle="Reviews"
          progressColor={isCompleted ? "#42AE55" : "#FDD07A"}
          background="#1c1c1c"
        />
      </aside>
      <aside className="review-info">
        {!isCompleted && (
          <div className="queue">
            <p className="title">{content.REVIEW_GOAL_TITLE_QUEUE}</p>
            <p className="desc">
              {content.REVIEW_GOAL_DESC_FIRST_ROW}
              <br />
              <br />
              {content.REVIEW_GOAL_DESC_SECOND_ROW}
            </p>
          </div>
        )}
        {isCompleted && (
          <div className="completed">
            <p className="title"> {content.REVIEW_GOAL_TITLE_COMPLETED}</p>
            <p className="desc">
              {content.REVIEW_GOAL_DESC_FIRST_ROW}
              <br />
              <br />
              {content.REVIEW_GOAL_DESC_SECOND_ROW}
            </p>
            <Button onClick={handlePreviewAgain} className="preview-again-button" buttonText="PREVIEW AGAIN" />
          </div>
        )}
      </aside>
    </div>
  );
};

export default ReviewGoal;
