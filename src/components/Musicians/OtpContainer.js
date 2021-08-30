import React from "react";

import "./musician.style.scss";
import { ReactComponent as Close } from "../../assets/img/musician/clear input.svg";
import { TextField } from "@material-ui/core";
import Button from "../../common/Button";
import cx from "classnames";

const OtpContainer = ({ onClose, resendTime, phoneNumber, handlePhoneVerify, onReSend, errors, resetOtpError, resentCode }) => {
  console.log("errors", errors);
  const onKeyUpEvent = (e) => {
    const index = Number(e.target.id.split("otp")[1]);
    if (e.target.value.length) {
      if (index < 4) {
        getInputElement(index).blur();
        getInputElement(index + 1).focus();
      }
    }

    if (e.keyCode === 8 && index !== 1) {
      getInputElement(index - 1).focus();
    }
  };

  const handleOnResend = () => {
    [...Array(5)].forEach((e, val) => {
      const input = document.getElementById(`otp${val}`);
      if (input) {
        input.value = null;
      }
    });
    if (resetOtpError) resetOtpError();

    onReSend(false);
  };

  const getInputElement = (index) => {
    return document.getElementById(`otp${index}`);
  };

  const handleOnContinueWithOtp = () => {
    let otp = "";

    [...Array(5)].forEach((e, val) => {
      const input = document.getElementById(`otp${val}`);
      if (input) {
        otp += input.value;
      }
    });
    if (resetOtpError) resetOtpError();

    handlePhoneVerify(phoneNumber, otp);
  };

  return (
    <div className="otp-container">
      <Close className="close-icon" onClick={onClose} style={{ minHeight: "30px" }} />
      <span className="phone-number-header">{`We sent code to ${phoneNumber}`}</span>
      <div className="text-container">
        <span className="code-txt">code</span>
        {errors?.otp && <span className="code-error-txt"> Invalid OTP! </span>}
        {resentCode && <span className="code-txt"> Resent Code! </span>}
      </div>
      <div className="verification-code-container">
        <TextField
          onKeyUp={onKeyUpEvent}
          id="otp1"
          variant="outlined"
          className={cx("verification-code-input", errors?.otp && "error-border")}
          autoComplete="off"
          type="number"
          inputProps={{ maxLength: 1 }}
        />
        <TextField
          onKeyUp={onKeyUpEvent}
          id="otp2"
          type="number"
          variant="outlined"
          className={cx("verification-code-input", errors?.otp && "error-border")}
          inputProps={{ maxLength: 1 }}
          autoComplete="off"
        />
        <TextField
          onKeyUp={onKeyUpEvent}
          id="otp3"
          type="number"
          variant="outlined"
          className={cx("verification-code-input", errors?.otp && "error-border")}
          inputProps={{ maxLength: 1 }}
          autoComplete="off"
        />
        <TextField
          onKeyUp={onKeyUpEvent}
          id="otp4"
          type="number"
          variant="outlined"
          className={cx("verification-code-input", errors?.otp && "error-border")}
          inputProps={{ maxLength: 1 }}
          autoComplete="off"
        />
      </div>
      <div style={{ marginTop: "20px", display: "flex", gap: "10%" }}>

        <Button buttonText={resendTime < 1 ? 'RESEND' : `RESEND IN ${resendTime}`} className="landing-acpt-cook-btn" onClick={() => {
          if (resendTime < 1) handleOnResend()
        }} />
        <Button buttonText="DONE" className="landing-i-acpt-cook-btn" onClick={handleOnContinueWithOtp} />

      </div>
    </div>
  );
};

export default OtpContainer;
