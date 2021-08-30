import React from "react";
import "./register.style.scss";
import cx from "classnames";
import { ReactComponent as Close } from "../../assets/img/musician/clear input.svg";
import InputField from "../../common/InputField";
import PhoneComponent from "../Login/PhoneComponent";
import PhoneSMS from "../../assets/img/phonesms.png";
import Button from "../../common/Button";
import { Drawer } from "@material-ui/core";
import OtpContainer from "../Musicians/OtpContainer";
import { toast } from "react-toastify";

const RegisterComponent = ({
  onClose,
  handleChange,
  state,
  errors,
  handleOnChangePhoneNumber,
  handleOnChangeCountryCode,
  phoneNumber,
  countryCode,
  handleOnSubmit,
  showPhoneModal,
  setShowPhoneModal,
  handleRegister,
  resetOtpError,
  resendTime
}) => {
  return (
    <div className="register-main-container">
      <Close className="close-icon" onClick={onClose} />
      <div className="register-second-container">
        <span className="register-header">
          Welcome to <br /> BREAKER NATION!
        </span>
        <div className="register-form">
          {errors.userExist && <span className="error-txt">{errors.message}</span>}
          <div className="register-input-container">
            <span className="input-label">Username</span>
            <InputField
              id="user_name"
              className={cx("register-input", errors?.user_name && "error-border")}
              value={state?.user_name}
              onChange={handleChange}
            />
          </div>
          <div className="register-input-container">
            <span className="input-label">First & Last Name</span>
            <InputField
              id="display_name"
              className={cx("register-input", errors?.display_name && "error-border")}
              value={state.display_name}
              onChange={handleChange}
            />
          </div>
          <div className="register-input-container">
            <span className="input-label">Email</span>
            <InputField
              id="email"
              className={cx("register-input", errors?.email && "error-border")}
              value={state.email}
              onChange={handleChange}
            />
          </div>
          <div className="register-input-container">
            <PhoneComponent
              phoneNumber={phoneNumber}
              handleOnChangePhoneNumber={handleOnChangePhoneNumber}
              handleOnChangeCountryCode={handleOnChangeCountryCode}
              small
              errors={errors}
              countryCode={countryCode}
              showErrorMessage={true}
            />
          </div>
          <div className="sms-info-container">
            <img src={PhoneSMS} alt="phone-sms-logo" width="19" height="24" />
            <span className="sms-message-span">{"We will send you an SMS to identificate this number"}</span>
          </div>
          <Button className="register-button-container"
            buttonText="REGISTER" onClick={()=>{
             if(resendTime > 1){
              toast.error(`Please wait for ${resendTime}secs`);
              }
                else{
                  handleOnSubmit()
                }
          }} />
        </div>
      </div>
      <Drawer anchor="right" open={showPhoneModal} onClose={() => setShowPhoneModal(false)}>
        <OtpContainer
          onClose={() => setShowPhoneModal(false)}
          phoneNumber={phoneNumber}
          handlePhoneVerify={handleRegister}
          onReSend={handleOnSubmit}
          resetOtpError={resetOtpError}
          errors={errors}
          resendTime={resendTime}
        />
      </Drawer>
    </div>
  );
};

export default RegisterComponent;
