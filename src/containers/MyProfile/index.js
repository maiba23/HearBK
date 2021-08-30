import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-use";
import MyProfileComponent from "../../components/MyProfile";
import { MY_PROFILE_TABS } from "../../components/MyProfile/constants";
import { trackMixpanel } from "../../mixpanel";
import mixpanel_constant from "../../mixpanel/mixpanel.constants";

const MyProfile = () => {
  const [selectedTab, setSelectedTab] = useState(MY_PROFILE_TABS[0]);
  const history = useHistory();
  const location = useLocation();

  const handleOnChangeTab = useCallback(
    (event, value) => {
      if (value === 0) history.push("/dashboard/profile");
      if (value === 1) history.push("/dashboard/profile/payment");
      if (value === 2) history.push("/dashboard/profile/influencer");
      if (value === 3) {
        localStorage.removeItem("x-access-token");
        history.push("/login");
      }
    },
    [selectedTab, history]
  );

  const trackEvents = () => {
    if (selectedTab.value === 0) {
      trackMixpanel(mixpanel_constant.open_my_profile, {});
    } else if (selectedTab.value === 1) {
      trackMixpanel(mixpanel_constant.profile_payment_tab, {});
    } else if (selectedTab.value === 2) {
      trackMixpanel(mixpanel_constant.profile_influencer_tab, {});
    } else if (selectedTab.value === 3) {
      trackMixpanel(mixpanel_constant.profile_logout_tab, {});
    }
  };

  React.useEffect(() => {
    //for logout
    trackEvents();
  }, [selectedTab]);

  React.useEffect(() => {
    switch (location.pathname) {
      case "/dashboard/profile":
        setSelectedTab(MY_PROFILE_TABS[0]);
        break;
      case "/dashboard/profile/":
        setSelectedTab(MY_PROFILE_TABS[0]);
        break;
      case "/dashboard/profile/payment":
        setSelectedTab(MY_PROFILE_TABS[1]);
        break;
      case "/dashboard/profile/payment/":
        setSelectedTab(MY_PROFILE_TABS[1]);
        break;
      case "/dashboard/profile/influencer":
        setSelectedTab(MY_PROFILE_TABS[2]);
        break;
      case "/dashboard/profile/influencer/":
        setSelectedTab(MY_PROFILE_TABS[2]);
        break;
      default:
        setSelectedTab(MY_PROFILE_TABS[0]);
        break;
    }
  }, [location]);

  return <MyProfileComponent selectedTab={selectedTab} handleOnChangeTab={handleOnChangeTab} />;
};

export default MyProfile;
