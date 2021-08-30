import React from "react";
import "./dashboard.styles.scss";
import { Drawer, Box } from "@material-ui/core";
import DashboardHeader from "./DashboardHeader";
import Influencers from "../../containers/Influencers";
import TabsDrawer from "./TabsDrawer";
import Activity from "../../containers/Activity";
import Tracks from "../../containers/Tracks";
import MyProfile from "../../containers/MyProfile";
import { Route, Switch } from "react-router-dom";
import AddTrack from "../../containers/AddTrack";
import TrackDetails from "../../containers/TrackDetails";
import Mail from "../../containers/Mail";
import { trackMixpanel } from "../../mixpanel";
import mixpanel_constant from "../../mixpanel/mixpanel.constants";

const DashboardComponent = ({
  selectedTab,
  setSelectedTab,
  handleOpenTabsDrawer,
  openTabs,
  openActivity,
  setOpenActivity,
  openActivityDrawer,
  setOpenActivityDrawer,
}) => {
  const handleClickActivityPopup = (event) => {
    trackMixpanel(mixpanel_constant.view_activity, {});
    if (window.screen.width > 650) {
      setOpenActivity(!openActivity);
    } else {
      setOpenActivityDrawer(true);
    }
  };

  return (
    <div className="dashboard-main-container">
      <DashboardHeader
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        setOpenDrawer={handleClickActivityPopup}
        openDrawer={openActivity}
        handleOpenTabsDrawer={handleOpenTabsDrawer}
      />
      <Switch>
        <Route component={Tracks} exact path="/dashboard" />
        <Route component={MyProfile} path="/dashboard/profile" />
        <Route component={Influencers} exact path="/dashboard/influencers" />
        <Route component={Mail} exact path="/dashboard/mails" />
        <Route component={TrackDetails} exact path="/dashboard/tracks/:trackId" />
        <Route path="/dashboard/add-track" exact component={AddTrack} />
      </Switch>
      <Drawer anchor="right" open={openTabs} onClose={handleOpenTabsDrawer}>
        <TabsDrawer onClose={handleOpenTabsDrawer} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </Drawer>
      <Drawer anchor="right" open={openActivityDrawer} onClose={() => setOpenActivityDrawer(false)}>
        <Activity onClose={() => setOpenActivityDrawer(false)} />
      </Drawer>
      {openActivity && (
        <Box id={openActivity ? "activity-popover" : undefined} className="popover-component">
          <Activity onClose={handleClickActivityPopup} />
        </Box>
      )}
    </div>
  );
};

export default DashboardComponent;
