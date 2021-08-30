import React, { useState, useCallback, useEffect } from "react";
import InitialSetupComponent from "../../components/InitialSetup";
import { Switch, useHistory, useLocation } from "react-router-dom";

const InitialSetup = () => {
  const [tabValue, setTabValue] = useState(100);
  const location = useLocation();
  const history = useHistory();

  const handleChangeTab = useCallback(
    (event, value) => {
      // if (value === 0) history.push("/initial-setup/genres");
      // if (value === 1) history.push("/initial-setup/personalInfo");
    },
    [history]
  );

  React.useEffect(() => {
    switch (location.pathname) {
      case "/initial-setup":
        setTabValue(0);
        break;
      case "/initial-setup/":
        setTabValue(0);
        break;
      case "/initial-setup/genres":
        setTabValue(0);
        break;
      case "/initial-setup/genres/":
        setTabValue(0);
        break;
      case "/initial-setup/personalInfo":
        setTabValue(1);
        break;
      case "/initial-setup/personalInfo/":
        setTabValue(1);
        break;
      default:
        setTabValue(0);
        break;
    }
  }, [location]);

  return <InitialSetupComponent tabValue={tabValue} handleChangeTab={handleChangeTab} />;
};

export default InitialSetup;
