import React from "react";
import PhoneSMS from "../../assets/img/phonesms.png";
import PhoneComponent from "../../components/Login/PhoneComponent";
import Button from "../../common/Button";
import constant from "../../components/Login/constants";
import BreakerLogo from "../../common/BreakerLogo";
import { Drawer } from "@material-ui/core";
import OtpContainer from "../../components/Musicians/OtpContainer";
import "./loginStyles.scss";
import RegisterContainer from "../../containers/Register";
import { toast } from "react-toastify";

const LoginComponent = ({
  phoneNumber,
  countryCode,
  showPhoneModal,
  setShowPhoneModal,
  handleOnChangePhoneNumber,
  handleOnChangeCountryCode,
  handleOnSubmit,
  error,
  onSignIn,
  toggleRegisterModel,
  showRegisterModal,
  resetOtpError,
  resentCode,
  loginLoading,
  resendTime
}) => {
  return (
    <>
      <div className="root-container">
        
        <div className="login-view-container">
          <BreakerLogo className="breaker-logo-style" />
          <span className="tag-line-text">{constant.TAKEOVER}</span>
          <PhoneComponent
            phoneNumber={phoneNumber}
            handleOnChangePhoneNumber={handleOnChangePhoneNumber}
            handleOnChangeCountryCode={handleOnChangeCountryCode}
            errors={error}
            countryCode={countryCode}
            showErrorMessage={true}
          />
          <div className="sms-info-container">
            <img src={PhoneSMS} alt="phone-sms-logo" width="19" height="24" />
            <span className="sms-message-span">{constant.SMS_MESSAGE}</span>
          </div>
          <Button className="login-button-container" loading={loginLoading} buttonText={constant.LOGIN} onClick={() => {
           if(resendTime > 1){
            toast.error(`Please wait for ${resendTime}secs`);
           }else { handleOnSubmit()}
            }} />
          <div className="register-txt-container">
            <span>Don't have an account?</span>
            <span className="register-txt" onClick={toggleRegisterModel}>
              Register now!
            </span>
          </div>
        </div>
      </div>
      <Drawer anchor="right" open={showPhoneModal} onClose={() => setShowPhoneModal(false)}>
        <OtpContainer
          resendTime={resendTime}
          onClose={() => setShowPhoneModal(false)}
          phoneNumber={phoneNumber}
          handlePhoneVerify={onSignIn}
          errors={error}
          onReSend={() => handleOnSubmit(true)}
          resetOtpError={resetOtpError}
          resentCode={resentCode}
        />
      </Drawer>
      <Drawer anchor="right" open={showRegisterModal} onClose={toggleRegisterModel}>
        <RegisterContainer />
      </Drawer>
    </>
  );
};

export default LoginComponent;
