import React from "react";
import DefaultUserImage from "../../../../assets/img/default-user-pic.png";
import "./profiletab.style.scss";

const PeopleCard = ({ displayName, profileImage, handleOnFollow, checkIfFollowed, user_id }) => {
  const followed = checkIfFollowed();

  return (
    <div className="people-card-container">
      <span className="left-container">
        <img className="avatar-style" alt="" src={profileImage ? profileImage : DefaultUserImage} />
        <span className="detail-container">
          <span className="display-name-text">{displayName}</span>
          <span className="role-text">Reviewer, Fan</span>
        </span>
      </span>
      <span onClick={() => handleOnFollow(user_id, !followed)} className="follow-button">
        <span className="follow-text">{followed ? "Unfollow" : "Follow"}</span>
      </span>
    </div>
  );
};

export default PeopleCard;
