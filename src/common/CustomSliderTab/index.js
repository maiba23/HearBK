import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import cx from "classnames";

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      width: "100%",
      backgroundColor: "#c8a86b",
    },
  },
  scroller: {
    overflowX: 'auto !important'
  }
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: "#fff",
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    height: "70px",
    minWidth: "100px",
    opacity: 1,
    "&:focus": {
      opacity: 1,
    },
  },
  selected: {
    opacity: "0.3 !important",
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles(() => ({
  rootContainer: {
    backgroundColor: "black",
  },
  flexContainer: {
    display: "flex",
    alignItems: "center",
  },
  fixed: {
    width: '90vw'
  }
}));

export default function CustomSliderTab({
  value,
  tabList,
  handleOnChange,
  customStyle,
  isDashboard
}) {
  const classes = useStyles();

  return (
    <div className={cx(classes.rootContainer, customStyle && customStyle)}>
      <StyledTabs value={value} classes={isDashboard && { fixed: classes.fixed }} onChange={handleOnChange}>
        {tabList.map((tabItem) => (
          <StyledTab
            key={tabItem.name}
            label={tabItem.name}
            value={tabItem.value}
          />
        ))}
      </StyledTabs>
    </div>
  );
}
