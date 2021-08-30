import React, { useEffect, useState } from "react";
import { ReactComponent as Clear } from "../../assets/img/musician/clear input.svg";
import DefaultProfile from "../../assets/img/dashboard/default-user-pic.png";
import { timeDiffCalc } from "../../utils/index";
import moment from "moment";
import { useSelector } from "react-redux";
import "./activity.style.scss";
import { trackMixpanel } from "../../mixpanel";
import mixpanel_constant from "../../mixpanel/mixpanel.constants";

const ActivityComponent = ({ onClose, handleOpenProfile }) => {
  const activity = useSelector(state => state.home.latest_activity);
  const [latestActivity, setLatestActivity] = useState([]);

  useEffect(() => {
    const sortedActivities = activity && activity.sort((a, b) => new Date(b.created_on) - new Date(a.created_on));
    setLatestActivity(sortedActivities);
  });

  const handleProfileClick = item => {
    let cta_url = item.cta_url.split("/");
    item.user_name = cta_url[3];
    handleOpenProfile(item);
    trackMixpanel(mixpanel_constant.view_user_profile_from_activity, { ...item });
  };

  return (
    <div className="activity-main-container">
      <div className="header">
        <Clear onClick={onClose} className="activity-close-icon" />
        <span className="header-text">LATEST ACTIVITY</span>
      </div>
      <div className="activity-container">
        {latestActivity &&
          latestActivity.map((item, index) => {
            return (
              <div className="activity-data-container">
                <div className="default-display">
                  <img
                    src={item.activity_image ? item.activity_image : DefaultProfile}
                    className="profile-image"
                    onClick={() => handleProfileClick(item)}
                  />
                  <div className="user-details">
                    <span className="user-name">{item.message.split("followed")[0]}</span>
                    <span className="message">started following you</span>
                  </div>
                </div>
                <span className="time">{timeDiffCalc(moment(item.created_on.replaceAll(/-/g, "/")), moment())}</span>
              </div>
            );
          })}
        {/* <div className="activity-data-container">
          <div className="default-display">
            <img src={DefaultProfile} className="profile-image" />
            <div className="user-details">
              <span className="user-name">Felisha</span>
              <div className="default-display">
                <span className="message">leveled up to</span>
                <span className="role">Influencer</span>
              </div>
            </div>
          </div>
          <span className="time">Now</span>
        </div>
        <div className="activity-data-container">
          <div className="default-display">
            <img src={DefaultProfile} className="profile-image" />
            <div className="user-details">
              <div className="default-display">
                <span className="user">ROAR</span>
                <span className="role">by passion</span>
              </div>
              <span className="message">hit Charts by number 1</span>
            </div>
          </div>
          <span className="time">3d</span>
        </div>
        <div className="activity-data-container">
          <div className="default-display">
            <img src={MailIcon} className="profile-image" />
            <div className="user-details">
              <span className="user-name">New mail from Breaker Nation</span>
              <span className="message">Check your inbox</span>
            </div>
          </div>
          <span className="time">3d</span>
        </div>
        <div>
          <div className="activity-data-container">
            <div className="default-display">
              <img src={DefaultProfile} className="profile-image" />
              <div className="user-details">
                <span className="user-name">Tokyo Jetz</span>
                <span className="message">Scheduled Room</span>
              </div>
            </div>
            <span className="time">1d</span>
          </div>
          <div className="room-story">
            <div>
            <img src={Profile} className="room-image"></img>
            </div>
            <img src={DefaultProfile} className="room-user-profile" />
            <img src={Nodify} className="nodification" />
            <div className="room-detail">
              <span className="heading">New Single Annoncment</span>
              <span className="user">by Tokyo Jetz</span>
              <span className="event-time">Today 07:00 PM EST</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ActivityComponent;
