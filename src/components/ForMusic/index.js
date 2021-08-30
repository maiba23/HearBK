import React, { useEffect, useRef } from "react";
import Button from "../../common/Button";
import { ReactComponent as BreakerIcon } from "../../assets/icon/breaker.svg";
import { ReactComponent as Heart } from "../../assets/icon/heart.svg";
import { ReactComponent as Star } from "../../assets/icon/star.svg";
import { ReactComponent as Chain } from "../../assets/icon/chain.svg";
import { ReactComponent as Apple } from "../../assets/icon/apple-icon.svg";
import { ReactComponent as GooglePlay } from "../../assets/icon/google-play.svg";
import { ReactComponent as BreakerNation } from "../../assets/icon/breaker-nation.svg";
import { ReactComponent as BreakerXS } from "../../assets/icon/breakerxs.svg";
import Listener from "../../assets/img/listeners pic.png";
import Mobile from "../../assets/img/app pic.png";
import content from "./content";
import content2 from "../Musicians/content";
import loginLogo from "../../assets/icon/lock.svg";
import { useHistory } from "react-router-dom";
import { Drawer } from "@material-ui/core";
import CookieContainer from "../Musicians/CookieContainer";
import breakerLogo from "../../assets/icon/breaker-logo.svg";
import "./styles.scss";

const ForMusicPage = ({
  state,
  setState,
  showPersonalizeContainer,
  setPersonalizeContainer,
  handleOnAcceptAllCookies,
  handleOnSavePreferences,
  handleChange,
  handleRedirectTo
}) => {
  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }, []);
  var history = useHistory();

  const enrollContainerRef = useRef();
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const executeScroll = () => scrollToRef(enrollContainerRef);

  return (
    <div className="full-container">
      <section className="landing-page-container">
        <div className="center-wrapper">
          {/* <div className="musician-tabs">
            <div className="musician-header-tags musician-tag-disable">{content.FANS}</div>
            <div className="musician-header-tags" onClick={() => history.push("/musicians")}>
              {content.FOR_MUSICIANS}
            </div>
            <div className="musician-header-tags" onClick={() => history.push("/musicians")}>
              <img src={loginLogo} alt="" />
              <span>Login</span>
            </div>
          </div> */}
          <div className="first-container">
            <div className="caption-container">
              <img className="breaker-logo" src={breakerLogo} alt="" />
              <div className="heading-container">{content.HEADING_TEXT}</div>
              <div className="content-container">{content.CONTENT_TEXT}</div>
              <div className="sign-in-button-container">
                <Button buttonText={content.BUTTON_TEXT} onClick={executeScroll} />
              </div>
            </div>

            <div className="image-container">
              <img src={Listener} alt="Listeners" className="listener-img" />
            </div>
          </div>
        </div>
      </section>

      <section className="landing-page-second-container">
        <div className="center-wrapper">
          <div className="second-container">
            <div className="preview-container">
              <img className="preview-img" src={Mobile} alt="preview-2" />
            </div>
            <div className="download-text-container" ref={enrollContainerRef}>
              <div className="download-heading">{content.DOWNLOAD_HEADING_TEXT}</div>
              <div className="download-text">
                <div className="icon">
                  <Star />
                </div>
                <div className="text-caption">{content.DOWNLOAD_CAPTION_1}</div>
              </div>
              <div className="download-text">
                <div className="icon">
                  <Heart />
                </div>
                <div className="text-caption">{content.DOWNLOAD_CAPTION_2}</div>
              </div>
              <div className="download-text">
                <div className="icon">
                  <Chain />
                </div>
                <div className="text-caption">{content.DOWNLOAD_CAPTION_3}</div>
              </div>
              <div className="download-text">
                <div className="icon">
                  <BreakerIcon />
                </div>
                <div className="text-caption">{content.DOWNLOAD_CAPTION_4}</div>
              </div>
              <div className="store-wrapper">
                <div className="store-details-container" onClick={() => handleRedirectTo('https://apps.apple.com/us/app/breaker-nation/id1533950005')}>
                  <div className="icon">
                    <Apple />
                  </div>
                  <div className="store-text">
                    <div className="sub-text">{content.DOWNLOAD_ON_THE}</div>
                    <div className="sub-heading">{content.STORE_HEADING_APP_STORE}</div>
                  </div>
                </div>
                <div className="store-details-container" onClick={() => handleRedirectTo('https://play.google.com/store/apps/details?id=com.breakernation')}>
                  <div className="icon">
                    <GooglePlay />
                  </div>
                  <div className="store-text">
                    <div className="sub-text">{content.STORE_TEXT_APP_STORE}</div>
                    <div className="sub-heading">{content.STORE_HEADING_GOOGLE_PAY}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 
      <div className="music-container">
        <div className="music-heading">{content.MAKE_MUSIC_HEADING}</div>
        <div className="music-caption">{content.MAKE_MUSIC_CAPTION}</div>
        <div className="sign-in-button-container">
          <Button buttonText={"Show me how !"} onClick={() => history.push("/musicians")} />
        </div>
      </div> */}
      <div className="copyright-container">
        <div className="icon-container">
          <BreakerXS />
          <BreakerNation />
        </div>
        <div className="footer-links-container">
          <span
            className="link-txt"
            onClick={() => handleRedirectTo('https://www.notion.so/Terms-of-Service-14290b5f4ef24f4289bdf20f904fbc1b')}
          >Terms</span>
          <span
            className="link-txt"
            onClick={() => handleRedirectTo('https://www.notion.so/Community-Guidelines-66175d3e3c444786a78220847c24ea93')}
          >Guidelines</span>
          {/* <span className="link-txt">Blog</span> */}
          <span
            className="link-txt-2"
            onClick={() => handleRedirectTo('https://www.notion.so/Privacy-Policy-ab5b0b7fea1a42bc8551a3a03dad3e35')}
          >Privacy</span>
        </div>
        <div className="copyright-text">{content.COPYRIGHT_TEXT}</div>
      </div>

      <section
        className="landing-accept-cookies-container"
        style={{
          display: state.isCookieAccepted ? "none" : "block",
        }}
      >
        <div className="center-wrapper">
          <div className="cookie-details">
            <div className="landing-accept-cookies-txt">{content2.PRIVACY_POLICY_TXT}</div>
            <div className="landing-acpt-cook-btn-cont">
              <Button
                buttonText={content2.PERSONALIZE_CHOICE}
                className="landing-acpt-cook-btn"
                onClick={() => {
                  setState({ ...state, isCookieAccepted: true });
                  setPersonalizeContainer(true);
                }}
              />
              <Button
                buttonText={content2.I_ACCEPT}
                className="landing-i-acpt-cook-btn"
                onClick={() => {
                  handleOnAcceptAllCookies();
                }}
              />
            </div>
          </div>
        </div>
      </section>
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
    </div>
  );
};

export default ForMusicPage;
