import React from "react";
import "./initialSetup.styles.scss";
import BreakerConnect from "../../assets/img/breaker-connect.png";
import CustomSliderTab from "../../common/CustomSliderTab";
import { INITIAL_SETUP_TABS } from "./constants";
import GenresContainer from "../../containers/GenresContainer";
import { ReactComponent as BreakerIcon } from "../../assets/icon/breakerxs.svg";
import { Route, Switch } from "react-router-dom";
import PersonalInfo from "../../containers/PersonalInfo";

const InitialSetupComponent = ({ tabValue, handleChangeTab }) => {
  return (
    <div className="initial-setup-main-container">
      <div className="initial-header-container">
        <img src={BreakerConnect} alt="breaker-connect" className="breaker-connect-img" />
        <BreakerIcon className="break-mobile-logo" />
        <span className="header-signIn-txt">Sign in</span>
      </div>
      <div className="initial-tab-container">
        <CustomSliderTab tabList={INITIAL_SETUP_TABS} value={tabValue} handleOnChange={handleChangeTab} />
      </div>
      <Switch>
        <Route path="/initial-setup/genres" exact component={GenresContainer} />
        <Route path="/initial-setup" exact component={GenresContainer} />
        <Route path="/initial-setup/personalInfo" exact component={PersonalInfo} />
      </Switch>
    </div>
  );
};
export default InitialSetupComponent;
