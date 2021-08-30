import React, { useRef } from "react";
import "./musician.style.scss";
import content from "./content";
import { ReactComponent as Breaker } from "../../assets/img/musician/breaker_nation.svg";
import { ReactComponent as DropDown } from "../../assets/img/musician/Vector 2.svg";
import { ReactComponent as Delete } from "../../assets/img/musician/delete 1.svg";
import PhoneVerify from "../../assets/img/musician/phone_verify.png";
import cx from "classnames";
import Button from "../../common/Button";
import InputField from "./../../common/InputField/index";
import "react-phone-number-input/style.css";
import { Drawer } from "@material-ui/core";
import Styles from "./Styles";
import CookieContainer from "./CookieContainer";
import OtpContainer from "./OtpContainer";
import SuccessContainer from "./SuccessContainer";
import { ReactComponent as BreakerNation } from "../../assets/icon/breaker-nation.svg";
import { ReactComponent as BreakerXS } from "../../assets/icon/breakerxs.svg";
import CustomSelect from "../../common/CustomSelect";

const countryCodeList = require("./CountryCode.json");
const countryCodeListFormatted = countryCodeList
  .map((code) => {
    return {
      label: code.name,
      value: code.dial_code,
    };
  })
  .sort((a, b) => String(a.name) - String(b.name));

console.log("countryCodeListFormatted", countryCodeListFormatted);
const MusicianComponent = ({
  genres,
  state,
  styles,
  setState,
  handleChange,
  selectedFile,
  handleTrackDetailsUpdate,
  handleOnSubmit,
  phoneModal,
  setPhoneModal,
  handlePhoneVerify,
  selectedGenre,
  selectedStyles,
  showStylesMenu,
  handleStylesSelect,
  handleGenreSelection,
  closeStylesMenu,
  showPersonalizeContainer,
  setPersonalizeContainer,
  handleOnAcceptAllCookies,
  handleOnSavePreferences,
  navigateToFans,
  openSuccess,
  setOpenSuccess,
  handleClickGotIt,
  errors,
  handleChangeCountryCode,
  countryCode,
  userMusician = false,
  resetOtpError,
}) => {
  const fileUploadEl = useRef(null);

  const handleUploadButtonClick = () => {
    fileUploadEl.current.click();
  };

  const enrollContainerRef = useRef();
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const executeScroll = () => scrollToRef(enrollContainerRef);

  return (
    <div className="musician-main-container">
      <div className="musician-top-container">
        <section className="musician-header">
          {/* <div className="musician-tabs">
            <span className="musician-header-tags" onClick={navigateToFans}>
              Music fans
            </span>
            <span
              className={cx("musician-header-tags", "musician-tag-disable")}
            >
              {content.FOR_MUSICIANS}
            </span>
          </div> */}
          <Breaker className="breaker-nation-icon" />
        </section>
        <section className="beta-txt-container">
          <div className="beta-txt-sub-container">
            <span className="beta-txt">{content.BETA_TEST_TEXT}</span>
          </div>
          <p className="before-you-txt">{content.BEFORE_YOU_RELEASE}</p>
        </section>
        <Button buttonText={content.LETS_START} className="lets-start-button" onClick={executeScroll} />
      </div>
      <div className="musician-middle-container" ref={enrollContainerRef}>
        <span className="send-music-text">{content.SEND_MUSIC}</span>
        <section className="musician-upload-section">
          <span className={cx("upload-track", errors.selectedFile && "error-text")}>{content.UPLOAD_TRACK}</span>
          <div className="upload-checkbox-type-container">
            <div className="check-box-outer">
              <div className="check-box-inner" />
            </div>
            <span className="upload-txt">{content.MP3_UPLOAD}</span>
          </div>
          {!selectedFile && (
            <div className={cx("file-upload-box", errors.selectedFile && "error-border-dashed")} onClick={handleUploadButtonClick}>
              <div style={{ display: "flex" }}>
                <span className="drag-txt">Drag or</span>
                <span className="file-upload-txt">&nbsp;upload&nbsp;</span>
                <span className="drag-txt">file</span>
              </div>
              <div className="attach-container">
                <span className="you-may-attach">{content.YOU_MAY_ATTACH} &nbsp;</span>
                <span className="file-size-txt">
                  <b>15MB</b>
                </span>
              </div>
            </div>
          )}
          {selectedFile && (
            <div className="file-upload-box-2" onClick={() => handleTrackDetailsUpdate(null)}>
              <div className="delete-container">
                <Delete />
              </div>
              <span className="file-name-txt">{selectedFile.name}</span>
            </div>
          )}
          <input accept=".mp3" ref={fileUploadEl} id="fileUpload" type="file" className="fileInput" onChange={handleTrackDetailsUpdate} />
        </section>
        <section className="track-info-container">
          <span className={cx("track-info", (errors.trackName || errors.artistName) && "error-text")}>Track info</span>
          <div className="track-info-sub-container">
            <section className="input-container">
              <span className="track-input-label">Track name</span>
              <InputField
                id="trackName"
                className={cx("track-info-input", errors.trackName && "error-border")}
                value={state.trackName}
                onChange={handleChange}
              />
            </section>
            <section className="input-container">
              <span className="track-input-label">Artist name</span>
              <InputField
                id="artistName"
                className={cx("track-info-input", errors.artistName && "error-border")}
                value={state.artistName}
                onChange={handleChange}
              />
            </section>
          </div>
        </section>
        <section className="track-info-container">
          <span className={cx("track-info", errors.selectedGenre && "error-text")}>Genres</span>
          <div className="track-info-sub-container">
            {genres.map((data) => (
              <div className={cx("genres-tag", data?._id === selectedGenre?._id && "selected")} onClick={() => handleGenreSelection(data)}>
                {data.name}
              </div>
            ))}
          </div>
        </section>
        {!userMusician && (
          <section className="track-info-container">
            <span
              className={cx(
                "track-info",
                (errors.phoneNumber || errors.displayName || errors.emailAddress || errors.userName) && "error-text"
              )}
            >
              Personal info
            </span>
            <div className="track-info-sub-container">
              <section className="input-container">
                <span className="track-input-label">Phone Number</span>
                <div className="phone-number-container">
                  <CustomSelect
                    onChange={handleChangeCountryCode}
                    value={countryCode}
                    dataProvider={countryCodeListFormatted}
                    IconComponent={() => <DropDown className="dropdown-icon" />}
                  />
                  {/* <div className="country-code-selector">
                  <span>+1</span>
                  <DropDown />
                </div> */}
                  <InputField
                    id="phoneNumber"
                    className={cx("track-info-input", "track-info-phone", errors.phoneNumber && "error-border")}
                    value={state.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </section>
              <section className="input-container">
                <span className="track-input-label">First & last name</span>
                <InputField
                  id="displayName"
                  className={cx("track-info-input", errors.displayName && "error-border")}
                  value={state.displayName}
                  onChange={handleChange}
                />
              </section>
              <section className="input-container">
                <span className="track-input-label">Email</span>
                <InputField
                  id="emailAddress"
                  className={cx("track-info-input", errors.emailAddress && "error-border")}
                  value={state.emailAddress}
                  onChange={handleChange}
                />
              </section>
              <section className="input-container">
                <span className="track-input-label">User Name</span>
                <InputField
                  id="userName"
                  className={cx("track-info-input", errors.userName && "error-border")}
                  value={state.userName}
                  onChange={handleChange}
                />
              </section>
            </div>
            <div className="phone-verify-txt-container">
              <img src={PhoneVerify} alt="No Img" height={25} />
              <span className="content-verify">{content.VERIFY}</span>
            </div>
          </section>
        )}
        <Button buttonText={content.SUBMIT} className="submit-button" onClick={handleOnSubmit} />
      </div>
      <div className="musician-bottom-container">
        <section className="bottom-inner-container">
          <span className="music-fans-txt">{content.MUSIC_FANS}</span>
          <span className="level-up-txt">{content.LEVELUP_TXT}</span>
          <Button onClick={navigateToFans} buttonText={content.KNOW_MORE} className="know-more-button" />
        </section>
        <section className="bottom-sub-container">
          {/* <img src={Breaker2} alt="No Image" /> */}
          <div className="icon-container">
            <BreakerXS />
            <BreakerNation />
          </div>
          <span className="right-reserved-txt">{content.RIGHT_RESERVED}</span>
        </section>
      </div>
      <Drawer anchor="right" open={showStylesMenu} onClose={closeStylesMenu}>
        <Styles
          onClose={closeStylesMenu}
          handleStylesSelect={handleStylesSelect}
          styles={styles}
          selectedStyles={selectedStyles}
          selectedGenre={selectedGenre}
        />
      </Drawer>
      <div
        className="landing-accept-cookies-container"
        style={{
          display: state.isCookieAccepted && "none",
        }}
      >
        <span className="landing-accept-cookies-txt">{content.PRIVACY_POLICY_TXT}</span>
        <section className="landing-acpt-cook-btn-cont">
          <Button
            buttonText={content.PERSONALIZE_CHOICE}
            className="landing-acpt-cook-btn"
            onClick={() => {
              setState({ ...state, isCookieAccepted: true });
              setPersonalizeContainer(true);
            }}
          />
          <Button
            buttonText={content.I_ACCEPT}
            className="landing-i-acpt-cook-btn"
            onClick={() => {
              handleOnAcceptAllCookies();
            }}
          />
        </section>
      </div>
      <Drawer
        anchor="right"
        open={showPersonalizeContainer}
        onClose={() => {
          setPersonalizeContainer(false);
        }}
      >
        <CookieContainer
          onClose={() => {
            setPersonalizeContainer(false);
          }}
          state={state}
          setState={setState}
          handleChange={handleChange}
          handleOnSavePreferences={handleOnSavePreferences}
        />
      </Drawer>
      <Drawer anchor="right" open={phoneModal} onClose={() => setPhoneModal(false)}>
        <OtpContainer
          onClose={() => setPhoneModal(false)}
          phoneNumber={state.phoneNumber}
          handlePhoneVerify={handlePhoneVerify}
          onReSend={handleOnSubmit}
          resetOtpError={resetOtpError}
          errors={errors}
        />
      </Drawer>
      <Drawer anchor="right" open={openSuccess} onClose={() => setOpenSuccess(false)}>
        <SuccessContainer onClose={() => setOpenSuccess(false)} handleClickGotIt={handleClickGotIt} />
      </Drawer>
    </div>
  );
};

export default MusicianComponent;
