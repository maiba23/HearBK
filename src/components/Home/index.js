import React, { useState, useCallback } from "react";
import Button from "../../common/Button";
import { Drawer } from "@material-ui/core";
import CookieContainer from "../Musicians/CookieContainer";
import content2 from "../Musicians/content";

import HomeLayout from "./HomeLayout";
import FullPageWrapper from "./PageSlide/FullPageWrapper";
import "./home.styles.scss";

const Home = () => {
  const [state, setState] = useState({
    isAdvertisingCookieEnabled: localStorage.getItem("is-advertising-cookie-enabled") === "true",
    isAnalyticsCookieEnabled: localStorage.getItem("is-analytics-cookie-enabled") === "true",
    isCookieAccepted: localStorage.getItem("is-cookies-accepted") === "true",
  });
  const [showPersonalizeContainer, setPersonalizeContainer] = useState(false);

  const handleOnAcceptAllCookies = useCallback(() => {
    localStorage.setItem("is-cookies-accepted", true);
    localStorage.setItem("is-advertising-cookie-enabled", true);
    localStorage.setItem("is-analytics-cookie-enabled", true);
    setPersonalizeContainer(false);
    setState({ ...state, isCookieAccepted: true });
  }, [state]);

  const handleOnSavePreferences = useCallback((data) => {
    localStorage.setItem("is-cookies-accepted", true);
    localStorage.setItem("is-advertising-cookie-enabled", data.isAdvertisingCookieEnabled);
    localStorage.setItem("is-analytics-cookie-enabled", data.isAnalyticsCookieEnabled);
    setPersonalizeContainer(false);
  }, []);

  const handleChange = (event) => {
    if (event.target.name) {
      setState({ ...state, [event.target.name]: event.target.checked });
    } else {
      setState({ ...state, [event.target.id]: event.target.value });
    }
  };

  return (
    <HomeLayout>
      <FullPageWrapper />
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
    </HomeLayout>
  );
};

export default Home;
