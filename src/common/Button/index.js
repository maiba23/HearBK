import React from "react";
import PropTypes from "prop-types";
import IconComponent from "../IconComponent";
import cx from "classnames";
import "./button.scss";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  buttonProgress: {
    color: props => props.color,
    width: "20px !important",
    height: "20px !important",
  },
}));

const Button = ({ className, onClick, buttonText, isIcon, iconName, disabled, loading, loadingColor }) => {
  const classes = useStyles({ color: loadingColor || "#000" });

  return !isIcon ? (
    <button className={cx(className, "common-button")} onClick={!loading && !disabled && onClick} disabled={disabled}>
      {loading && <CircularProgress className={classes.buttonProgress} />}
      {!loading && <span>{buttonText}</span>}
    </button>
  ) : (
    <div role="button" onClick={onClick}>
      <IconComponent className={className} iconName={iconName} />
    </div>
  );
};

Button.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  disabled: PropTypes.bool,
  isIcon: PropTypes.bool,
};

Button.defaultProp = {
  isIcon: false,
  disabled: false,
  buttonText: "",
};

export default Button;
