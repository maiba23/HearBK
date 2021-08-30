import React from "react";
import "./influencerSetting.scss";
import content from "./content";
import { makeStyles, Slider } from "@material-ui/core";
import InputField from "../../../../common/InputField";
import Button from "../../../../common/Button";
import TextAreaField from "../../../../common/TextAreaField";
import { ReactComponent as BreakerGrey } from "../../../../assets/icon/breaker-grey.svg";
import questionIcon from "../../../../assets/icon/question.svg";
import QualityControlDetails from "./QualityControlDetails";

const useStyles = makeStyles(() => ({
  root: { color: "#c8a86b", marginTop: 20 },
  rail: { color: " #eef0fa33" },
  active: { boxShadow: "0px 0px 0px 8px #c8a86b36 !important" },
  focusVisible: { boxShadow: "0px 0px 0px 8px #c8a86b36 !important" },
  thumb: { width: 20, height: 20, marginTop: -9 },
  valueLabel: { left: "-6px" },
}));

const InfluencerSettingComponent = ({
  handleSetFilterValue,
  state,
  showQualityControlDetails,
  setShowQualityControlDetails,
  handleChangeState,
  handleUpdateProfile,
  waitlist,
  saveLoading,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className="inf-sett-main-container">
        {waitlist || waitlist === undefined ? (
          <div className="non-influencer-container">
            <BreakerGrey />
            <span className="non-influencer-txt">{content.GET_ACCESS}</span>
          </div>
        ) : (
          <section className="setting-inner-container">
            <span className="influencer-setting-header">{content.INFLUENCER_SETTINGS}</span>
            <div className="influencer-second-container">
              <section className="sec-first-container">
                <div>
                  <div className="influencer-setting-title-container">
                    <span className="approval-rating">{content.APPROVAL_RATING}</span>
                    <img onClick={() => setShowQualityControlDetails(true)} src={questionIcon} alt="" />
                  </div>
                  <p className="approval-rating-content">{content.APPROVAL_FILTER_CONTENT}</p>
                </div>
                <span>{`${state.filter}`}% &nbsp;of &nbsp;100%</span>
                <Slider
                  classes={{
                    root: classes.root,
                    rail: classes.rail,
                    active: classes.active,
                    focusVisible: classes.focusVisible,
                    thumb: classes.thumb,
                    valueLabel: classes.valueLabel,
                  }}
                  value={state.filter}
                  onChange={handleSetFilterValue}
                />
                <div className="review-price-container">
                  <span className="approval-rating">{content.SPECIFY_REVIEW_PRICE}</span>
                  <div className="price-container">
                    <span>$</span>
                    <InputField className="price-input" id="price" value={state.price} onChange={handleChangeState} />
                  </div>
                </div>
              </section>
              <section className="sec-second-container">
                <span className="send-me-header">{content.SEND_ME}</span>
                <TextAreaField className="send-me-txt-field" id="headline" value={state.headline} onChange={handleChangeState} />
              </section>
              <Button loading={saveLoading} buttonText="SAVE" className="save-button" onClick={handleUpdateProfile} />
            </div>
          </section>
        )}
      </div>
      <QualityControlDetails open={showQualityControlDetails} handleClose={() => setShowQualityControlDetails(false)} />
    </>
  );
};

export default InfluencerSettingComponent;
