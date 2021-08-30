import React, { useState, useEffect } from "react";
import BreakerLogo from "../../../../assets/icon/breakerxs.svg";
import StarLogo from "../../../../assets/icon/star.svg";
import Button from "../../../../common/Button";
import moment from "moment";
import "./profiletab.style.scss";
import cx from "classnames";
import { formatDate } from "../../../../utils";

const BioSection = ({ showBioEditor, toggleBioEditor, bioData, handleOnUpdateBio, listenerStartTimeline }) => {
  const [bio, setBio] = useState(bioData);
  const [currentExperience, setCurrentExperience] = useState({
    key: "",
    start: "",
    value: "",
  });
  useEffect(() => {
    setBio(bioData);
  }, [bioData]);

  const cancelEditor = () => {
    setBio(bioData);
    toggleBioEditor();
  };

  useEffect(() => {
    const keysArray = Object.keys(listenerStartTimeline);
    const initialExperience = { key: "", start: "", value: "" };
    setCurrentExperience(
      keysArray?.length ? listenerStartTimeline[keysArray[keysArray.length - 1]] || initialExperience : initialExperience
    );
  }, [listenerStartTimeline]);

  const getCurrentExperienceDate = () => {
    return currentExperience.start ? `${formatDate(currentExperience.start, "MMM DD")} - present` : "";
  };

  return (
    <div className="bio-section-root-container">
      <div className="left-container">
        <span className="bio-text">Bio</span>
        {showBioEditor ? (
          <div>
            <textarea value={bio} className="edit-bio-input-container" onChange={(e) => setBio(e.target.value)} />
          </div>
        ) : (
          <span className="bio-data">{bio}</span>
        )}

        {showBioEditor ? (
          <div className="bio-section-button-container">
            <Button buttonText="SAVE" className="bio-save-button" onClick={() => handleOnUpdateBio(bio)} />
            <Button buttonText="CANCEL" className="bio-cancel-button" onClick={cancelEditor} />
          </div>
        ) : (
          <span onClick={toggleBioEditor} className="editbio-button">
            Edit bio
          </span>
        )}
      </div>
      <div className="right-container">
        <div className="top-container">
          <img src={BreakerLogo} className="breaker-logo" />
          <span className="experience-text">Experience</span>
        </div>
        <div className="bottom-container">
          <img src={StarLogo} className="star-logo" />
          <span className="rater-container">
            <span className="rater-text">{currentExperience.value}</span>
            <span className="date-text">{getCurrentExperienceDate()}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BioSection;
