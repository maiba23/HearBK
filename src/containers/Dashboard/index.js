import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import DashboardComponent from "../../components/Dashboard";
import { getUserDetails } from "../../state/actions/userActions";
import { useHistory, useLocation } from "react-router-dom";
import { trackMixpanel } from "../../mixpanel";
import mixpanel_constant from "../../mixpanel/mixpanel.constants";

const DashboardContainer = () => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(0);
  const [openActivity, setOpenActivity] = useState(false);
  const [openActivityDrawer, setOpenActivityDrawer] = useState(false);
  const [openTabs, setOpenTabs] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    dispatch(getUserDetails(false, true));
  }, [dispatch]);

  const handleOpenTabsDrawer = useCallback(() => {
    setOpenTabs(!openTabs);
  }, [openTabs]);

  const handleTabSelect = val => {
    if (val === 0) history.push("/dashboard");
    if (val === 1) history.push("/dashboard/influencers");
    if (val === 2) history.push("/dashboard/mails");
  };

  React.useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        setSelectedTab(0);
        trackMixpanel(mixpanel_constant.your_tracks_all_tracks, {});
        break;
      case "/dashboard/":
        setSelectedTab(0);
        trackMixpanel(mixpanel_constant.your_tracks_all_tracks, {});
        break;
      case "/dashboard/influencers":
        setSelectedTab(1);
        trackMixpanel(mixpanel_constant.influencers_list, {});
        break;
      case "/dashboard/influencers/":
        setSelectedTab(1);
        trackMixpanel(mixpanel_constant.influencers_list, {});
        break;
      case "/dashboard/mails":
        setSelectedTab(2);
        break;
      case "/dashboard/mails/":
        setSelectedTab(2);
        break;
      default:
        setSelectedTab(100);
        break;
    }
  }, [location]);
  return (
    <DashboardComponent
      selectedTab={selectedTab}
      setSelectedTab={handleTabSelect}
      handleOpenTabsDrawer={handleOpenTabsDrawer}
      openTabs={openTabs}
      openActivity={openActivity}
      setOpenActivity={setOpenActivity}
      openActivityDrawer={openActivityDrawer}
      setOpenActivityDrawer={setOpenActivityDrawer}
    />
  );
};

export default DashboardContainer;
