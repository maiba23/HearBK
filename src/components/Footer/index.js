import React, { useState, useEffect } from "react";
import "./style.scss";
import { NavLink, withRouter } from "react-router-dom";
import Icon from "../../common/IconComponent";
import { ReactComponent as Home } from "../../assets/icon/home.svg";
import { ReactComponent as Music } from "../../assets/icon/music.svg";
import { ReactComponent as Business } from "../../assets/icon/business.svg";
import { ReactComponent as Social } from "../../assets/icon/social.svg";
import { useLocation } from "react-use";
import { connect } from "react-redux";
import { preferencsSelector } from "../../state/selectors/preferences";

const excludesRoutes = [
  "/",
  "/signin",
  "/forgot-password",
  "/reset",
  "/splash",
  "/loginScreen",
  "/signupScreen",
  "/emailSignup",
  "/emailSignIn",
  "/emailReset",
  "/changePassword",
  "/phoneSignup",
  "/phoneSignin",
  "/verifySignup",
  "/verifySignin",
  "/welcome",
  "/onboarding",
  "/onboarding-complete",
  "/access-code",
  "/landing",
  "/landingEducate",
  "/connectSignIn",
  "/connectNumber",
  "/verifyNumber",
  "/landingConnect",
  "/accountCreation",
  "/setPrefrences",
  "/musicians"
];

const Footer = ({ userDetails }) => {
  const [showFooter, setShowFooter] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (excludesRoutes.includes(location.pathname)) {
      setShowFooter(false);
    } else if(location.pathname.indexOf('verifyNumber') === 1){
      setShowFooter(false);
    }else {
      setShowFooter(true);
    }
  }, [location.pathname]);
  return showFooter ? (
    <div className="footer-Container">
      <div className="footer-container-1">
        <NavLink to="/home" className="footer-Links">
          <svg className="footer-Icon">
            <Home />
          </svg>
        </NavLink>
        <NavLink to="/upload" className="footer-Links">
          <svg className="footer-Icon">
            <Music />
          </svg>
        </NavLink>
      </div>
      <NavLink to="/play" className="footer-Links-1">
        <Icon className="footer-Icon-1" iconName="app-icon" />
      </NavLink>
      <div className="footer-container-2">
        <NavLink to="/leaderboard-home" className="footer-Links">
          <svg className="footer-Icon">
            <Business />
          </svg>
        </NavLink>
        <NavLink
          // to={`/profile/${userDetails?.user_name}`}
          to="profile-settings"
          className="footer-Links"
        >
          <svg className="footer-Icon">
            <Social />
          </svg>
        </NavLink>
      </div>
    </div>
  ) : null;
};

export default connect((state) => ({
  ...preferencsSelector(state),
}))(Footer);
