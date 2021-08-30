import React from "react";
import cx from "classnames";
import InputField from "../../../../common/InputField";
import CustomSelect from "../../../../common/CustomSelect";
import { ReactComponent as DropDown } from "../../../../assets/img/musician/Vector 2.svg";
import { TextField } from "@material-ui/core";
import Button from "../../../../common/Button";
import PhoneVerify from "../../../../assets/img/musician/phone_verify.png";
import "./profiletab.style.scss";

const countryCodeList = require("../../../Musicians/CountryCode.json");
const countryCodeListFormatted = countryCodeList
  .map((code) => {
    return {
      label: code.name,
      value: code.dial_code,
    };
  })
  .sort((a, b) => String(a.name) - String(b.name));

const EditProfileContainer = ({
  errors = {},
  handleOnResend,
  handlePhoneVerify,
  handleOnEditData,
  handleOnSaveEditProfile,
  data,
  isInvalidPhoneNumber,
}) => {
  const isVerifyOtp = data.type !== "editData";

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
    handlePhoneVerify(otp);
  };

  const renderVerifyPhoneOtpComponent = () => (
    <>
      <div className="textfield-container">
        <span className="textfield-name-text">Code from SMS</span>
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
        <div className="verification-for-edit-action">
          <Button buttonText="RESEND" className="landing-acpt-cook-btn" onClick={handleOnResend} />
          <Button buttonText="DONE" className="landing-i-acpt-cook-btn" onClick={handleOnContinueWithOtp} />
        </div>
      </div>
    </>
  );

  const renderUserDetailComponent = () => (
    <>
      <div className="textfield-container">
        <span className="textfield-name-text">Username</span>
        <InputField value={data.userName} className={cx("input-container")} onChange={(e) => handleOnEditData(e, "userName")} />
      </div>
      <div className="textfield-container">
        <span className="textfield-name-text">First & Last name</span>
        <InputField value={data.displayName} className={cx("input-container")} onChange={(e) => handleOnEditData(e, "displayName")} />
      </div>
      <div className="textfield-container">
        <span className="textfield-name-text">Email</span>
        <InputField className={cx("input-container")} value={data.email} onChange={(e) => handleOnEditData(e, "email")} />
      </div>
      <div className="textfield-container">
        <div className="phone-container">
          <span className="textfield-name-text">Phone Number</span>
          {isInvalidPhoneNumber && <span className="textfield-error-text">Invalid Phone Number</span>}
        </div>
        <div className="phone-input-container">
          <CustomSelect
            onChange={(e) => handleOnEditData(e, "countryCode")}
            value={data.countryCode}
            dataProvider={countryCodeListFormatted}
            IconComponent={() => <DropDown className="dropdown-icon" />}
          />
          <InputField
            className={cx("input-container phone-number-input")}
            value={data.phoneNumber}
            onChange={(e) => handleOnEditData(e, "phoneNumber")}
          />
        </div>
      </div>
      <div className="phone-verify-txt-container">
        <img src={PhoneVerify} alt="No Img" height={25} />
        <div style={{ width: 250 }}>
          <span className="content-verify">We will send you an SMS to identificate this number</span>
        </div>
      </div>
      <div>
        <Button buttonText="SAVE" className="submit-button" onClick={handleOnSaveEditProfile} />
      </div>
    </>
  );

  return (
    <div className="edit-profile-root-container">
      <span className="edit-profile-type-text">{isVerifyOtp ? "Verify phone number" : "Edit profile"}</span>
      {isVerifyOtp ? renderVerifyPhoneOtpComponent() : renderUserDetailComponent()}
    </div>
  );
};

export default EditProfileContainer;
