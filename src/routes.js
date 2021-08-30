import React, { useState, useCallback, useEffect } from "react";
import { Switch, Router, Route } from "react-router-dom";
import DashboardContainer from "./containers/Dashboard";
import Fan from "./containers/Fan";
import Musician from "./containers/Musician";
import Login from "./containers/Login";
import RoomPreview from "./components/RoomPreview";

import history from "./history";
import { getTokenDetails } from "./state/actions/userActions";
import UserMusician from "./containers/UserMusician";
import InitialSetup from "./containers/InitialSetup";

import Home from "./components/Home";

export const MenuHandlerContext = React.createContext();

export default (props) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenuClick = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu]);

  // useEffect(() => {
  //   const isAccessTokenEntered = localStorage.getItem("access-token-entered");
  //   if (!isAccessTokenEntered) {
  //     history.push("/access-code");
  //   }
  // }, []);

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={Fan} exact />
        <Route path="/home" component={Home} exact />
        <Route path="/musicians" component={Musician} exact />
        <Route path="/event/:roomId" component={RoomPreview} exact />
        <Route path="/dashboard" component={withValidToken(DashboardContainer)} />
        <Route path="/user-musicians" component={withValidToken(UserMusician)} exact />
        <Route path="/initial-setup" component={withValidToken(InitialSetup)} />
        <Route path="/login" component={Login} exact />
      </Switch>
    </Router>
  );
};

const withValidToken = (WrappedComponent) => {
  const returnUrl = window.location.pathname;

  return class extends React.Component {
    componentDidMount() {
      window.scrollTo(0, 0);
      // const isAccessTokenEntered = localStorage.getItem("access-token-entered");
      // if (!isAccessTokenEntered) {
      //   history.push("/access-code");
      //   return;
      // }
      if (!localStorage.getItem("x-access-token")) {
        history.push("/login?return_url=" + returnUrl);
      }
      if (!localStorage.getItem("access-token-verified")) {
        (async () => {
          const response = await getTokenDetails();
          if (!response.ok) {
            localStorage.removeItem("x-access-token");
            localStorage.removeItem("isPremiumUser");
            localStorage.removeItem("isFirstUserLogin");
            localStorage.removeItem("access-token-verified");
            history.push("/login?return_url=" + returnUrl);
          } else {
            localStorage.setItem("access-token-verified", "true");
          }
        })();
      }
    }
    componentDidUpdate(prevProps) {
      if (this.props.location.pathname !== prevProps.location.pathname) {
        window.scrollTo(0, 0);
      }
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};
