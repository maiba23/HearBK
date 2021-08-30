import React from "react";
import "./profile.styles.scss";
import cx from "classnames";
import content from "./content";
import { ReactComponent as Clear } from "../../assets/img/musician/clear input.svg";
import { ReactComponent as Music } from "../../assets/icon/music.svg";
import DefaultProfile from "../../assets/img/default-user-pic.png";
import { ReactComponent as Verified } from "../../assets/icon/verifeied.svg";

const ProfileComponent = ({ onClose, profileDetails, follow, handleOnFollow, handleOpenReviewRequest }) => {
  return (
    <div className="profile-container">
      <div className="profile-header-container">
        <Clear onClick={onClose} />
        {profileDetails._id && (
          <div className={cx("follow-un-follow-button", follow && "followed-button")} onClick={handleOnFollow}>
            {content.FOLLOW}
          </div>
        )}
      </div>
      <section className="profile-main-container">
        <img src={profileDetails?.profile_image || DefaultProfile} alt="profile img" className="profile-img" />
        <section className="profile-name-section">
          <div className="name-sub-container">
            <span className="profile-name">{profileDetails?.display_name}</span>
            <Verified />
          </div>
          <div className="name-sub-container">
            <Music />
            <span className="profile-track-number">{profileDetails?.musicNotes || 0}</span>
          </div>
        </section>
        <section className="profile-followers-section">
          <div className="followers-button">
            <span className="followers-txt">{content.FOLLOWERS}</span>
            <span className="followers-number">{profileDetails?.followers?.length || 0}</span>
          </div>
          <div className="followers-button">
            <span className="followers-txt">{content.FOLLOWING}</span>
            <span className="followers-number">{profileDetails?.following?.length || 0}</span>
          </div>
        </section>
        <section className="send-me-section">
          <span className="send-me-header">{content.SEND_ME}</span>
          <span className="send-me-content">{profileDetails?.headline}</span>
          {!!profileDetails?.price && (
            <div onClick={handleOpenReviewRequest} className="request-button">
              <div />
              <span className="request-review-txt">{content.REQUEST_REVIEW}</span>
              <span className="request-amount">${profileDetails?.price}</span>
            </div>
          )}
        </section>
        <section className="roles-section">
          <span className="roles-header">{content.ROLES}</span>
          <div className="roles-container">
            {profileDetails?.listener_roles?.map((role) => {
              return (
                <div key={role._id} className="role-card">
                  {role.name}
                </div>
              );
            })}
          </div>
        </section>
        <section className="bio-section">
          <span className="bio-header">{content.BIO}</span>
          <p className="bio-content">{profileDetails?.bio}</p>
        </section>
      </section>
    </div>
  );
};

export default ProfileComponent;
