import React from "react";
import { ReactComponent as Logo } from "../../assets/icon/breaker-logo.svg";
import "./styles.scss";

const BreakerLogo = ({ className }) => {
  return <Logo className={className} />;
};

export default BreakerLogo;
