import React from "react";
import "./dashboard.styles.scss";
import cx from "classnames";
import Avatar from "../../assets/img/default-user-pic.png";
import { ReactComponent as Bell } from "../../assets/img/dashboard/bell.svg";
import { ReactComponent as BreakerIcon } from "../../assets/icon/breakerxs.svg";
import { ReactComponent as BreakerIcon2 } from "../../assets/icon/breaker-logo-2.svg";
import { ReactComponent as Menu } from "../../assets/icon/menu.svg";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const DashboardHeader = ({ selectedTab, setSelectedTab, setOpenDrawer, openDrawer, handleOpenTabsDrawer }) => {
  const userDetails = useSelector((state) => state.userDetails.user);
  const showDashboardProfileView = useSelector((state) => state.profile.showDashboardProfileView);
  const history = useHistory();
  const doLogout = () => {
    localStorage.removeItem("x-access-token");
    history.push("/login");
  }
  return (
    <div className="header-bar-main-container">
      <BreakerIcon2 className="breaker-connect-img" />
      <BreakerIcon className="break-mobile-logo" />
      <div className="tabs-container">
        <div className={cx("tab-element", selectedTab === 0 && "selected-tab-element")} onClick={() => setSelectedTab(0)}>
          <span className="tab-text">TRACKS</span>
        </div>
        <div className={cx("tab-element", selectedTab === 1 && "selected-tab-element")} onClick={() => setSelectedTab(1)}>
          <span className="tab-text">INFLUENCERS</span>
        </div>
        {/* <div className={cx("tab-element", selectedTab === 2 && "selected-tab-element")} onClick={() => setSelectedTab(2)}>
          <span className="tab-text">MAILS</span>
        </div> */}
        <span className="break-desktop-logout" onClick = {doLogout}>Logout</span>
      </div>
      <div className="header-right-container">
        <Menu className="menu-mobile-icon" onClick={handleOpenTabsDrawer} />
        <img
          src={`${userDetails?.profile_image ? userDetails.profile_image : Avatar}?${new Date().getTime()}`} 
          alt="no Img"
          width={35}
          height={35}
          className={cx("profile-img-header", showDashboardProfileView && "profile-img-header-selected")}
          onClick={() => history.push("/dashboard/profile")}
        />
        <Bell onClick={(e) => setOpenDrawer(e)} className={cx("bell-icon", !openDrawer && "bell-white")} />
      </div>
    </div>
  );
};

export default DashboardHeader;
