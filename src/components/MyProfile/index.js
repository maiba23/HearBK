import React from "react";
import { Route, Switch } from "react-router-dom";
import CustomSliderTab from "../../common/CustomSliderTab";
import InfluencerSettingContainer from "../../containers/MyProfile/Tabs/InfluencerSettings";
import PaymentContainer from "../../containers/MyProfile/Tabs/Payment";
import ProfileTab from "../../containers/MyProfile/Tabs/Profile";
import { MY_PROFILE_TABS } from "./constants";
import "./myProfile.styles.scss";

const MyProfileComponent = ({ selectedTab, handleOnChangeTab }) => {
  return (
    <>
      <div className="profile-tab-container">
        <div className="profile-button-container">
          <CustomSliderTab tabList={MY_PROFILE_TABS} isDashboard value={selectedTab.value} handleOnChange={handleOnChangeTab} />
        </div>
      </div>
      <div className="profile-root-view-container">
        <Switch>
          <Route component={ProfileTab} exact path="/dashboard/profile" />
          <Route component={PaymentContainer} exact path="/dashboard/profile/payment" />
          <Route component={InfluencerSettingContainer} exact path="/dashboard/profile/influencer" />
        </Switch>
      </div>
    </>
  );
};

export default MyProfileComponent;
