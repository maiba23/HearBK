import React, { useRef, useEffect, useState } from "react";
import cx from "classnames";
import DefaultUserImage from "../../../../assets/img/default-user-pic.png";
import PencilImage from "../../../../assets/img/pencil.png";
import MusicNoteImage from "../../../../assets/img/music-notes.png";
import SettingImage from "../../../../assets/img/setting.png";
import "./profiletab.style.scss";

const ProfileSection = ({
  displayName,
  followers,
  following,
  notesScore,
  profileImage,
  toggleFollowerOrFollowingDrawer,
  openEditProfileDrawer,
  uploadUserImage,
  listenerLevel,
  tracksRated,
}) => {
  const inputFile = useRef(null);
  const [progressPercent, setProgressPercent] = useState(0);

  const handleOn = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  useEffect(() => {
    const trackRatedToNextLevel = listenerLevel?.nextLevelAt || 0;
    setProgressPercent(
      tracksRated != 0 && trackRatedToNextLevel != 0
        ? (tracksRated / trackRatedToNextLevel) * 100
        : 0
    );
  }, [listenerLevel, tracksRated]);

  return (
    <div className="profile-view-container-1">
      <div className="avatar-div-container">
        <img
          src={`${profileImage ? profileImage : DefaultUserImage}?${new Date().getTime()}`} 
          className="default-user-item"
          alt="default-user"
          key={Date.now()}
        />
        <div className="edit-root-container">
          <input
            type="file"
            id="file"
            multiple={false}
            ref={inputFile}
            style={{ display: "none" }}
            accept="image/x-png,image/gif,image/jpeg"
            onChange={(e) => uploadUserImage(inputFile.current.files)}
          />
          <img
            onClick={handleOn}
            src={PencilImage}
            alt="profile-image-edit-button"
          />
        </div>
      </div>
      <div className="right-container">
        <div className="user-detail-container">
          <div>
            <span className="user-name-span">{displayName}</span>
            <div className="notes-container">
              <img
                src={MusicNoteImage}
                className="music-note-image"
                alt="notes"
              />
              <span className="note-score-span-container">{notesScore}</span>
            </div>
          </div>
          <div
            className="setting-button-container"
            onClick={() => openEditProfileDrawer(true, "editProfile")}
          >
            <span className="setting-span-container">
              <img src={SettingImage} alt="setting-icon" />
              <span className="edit-profile-span">EDIT PROFILE</span>
            </span>
          </div>
        </div>
        <div className="user-detail-container">
          <div>
            <div className="progress-root-container">
              <div
                style={{
                  width: `${progressPercent}%`,
                }}
                className="progress-bar"
              ></div>
            </div>
            <div className="div-container-2">
              <span className="rank-container">
                <span className="currentrank-span-text">Current rank</span>
                <span className="rankvalue-span-text">
                  {listenerLevel?.value || ""}{" "}
                </span>
              </span>
              <span className={cx("rank-container", "opacity")}>
                <span className="nextrank-span-text">Next rank</span>
                <span className="rankvalue-span-text">
                  {listenerLevel?.nextLevel || ""}
                </span>
              </span>
            </div>
          </div>
          <div className="social-button-container">
            <div
              className="follower-button-container"
              onClick={() => toggleFollowerOrFollowingDrawer("followers")}
            >
              <span className="follower-span-container">
                <span className="span-text">Followers</span>
                <span className="span-value-text">{followers.length} </span>
              </span>
            </div>
            <div
              className="follower-button-container"
              onClick={() => toggleFollowerOrFollowingDrawer("following")}
            >
              <span className="follower-span-container">
                <span className="span-text">Following</span>
                <span className="span-value-text"> {following.length} </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
