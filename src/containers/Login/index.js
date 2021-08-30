import React, { useState, useCallback,useEffect } from "react";
import LoginComponent from "../../components/Login/LoginComponent";
import { validateRegex } from "../../utils";
import { authenticatePhone, getUserDetails, phoneVerification } from "../../state/actions/userActions";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOpenRegisterDispatch } from "../../state/actions/homeAction";
import { useLocation } from "react-use";
import { isValidPhoneNumber } from "react-phone-number-input";

const Login = () => {
  const dispatch = useDispatch();
  const showRegisterModal = useSelector((state) => state.home.openRegister || false);
  const [loginLoading, setLoginLoading] = React.useState(false);
  const history = useHistory();
  const location = useLocation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState(localStorage.getItem("country-code") || "+1");
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [resentCode, setResentCode] = useState(false);
  const [error, setError] = useState({
    message: "",
    phoneNumber: false,
    otp: false,
  });
  const [resendTime, setResendTime] = useState(0)

  const handleNavigateAfterSuccess = () => {
    let search = location.search;
    if (search.includes("return_url")) {
      search = search.replace("?return_url=", "");
      return search;
    }
    return "/dashboard";
  };

  const resetError = useCallback(() => {
    setError({ ...error, message: "", phoneNumber: false });
  }, [error]);

  const handleOnChangePhoneNumber = useCallback(
    (e) => {
      error.phoneNumber && resetError();
      setPhoneNumber(e.target.value);
    },
    [setPhoneNumber, error, resetError]
  );

  const handleOnChangeCountryCode = useCallback(
    (e) => {
      setCountryCode(e.target.value);
      localStorage.setItem("country-code", e.target.value);
    },
    [setCountryCode]
  );

  const areFieldsValid = () => {
    const isValid = isValidPhoneNumber(`${countryCode}${phoneNumber.trim()}`);
    !isValid && setError({ ...error, message: "Invalid Phone Number", phoneNumber: true });

    return isValid;
  };

  const onSignInForVerify = async (resent = false) => {
    if (areFieldsValid()) {
      const number = encodeURIComponent(`${countryCode}${phoneNumber}`);
      setError({
        ...error,
        message: "",
        phoneNumber: false,
      });
      setLoginLoading(true);
      setResendTime(60)
      authenticatePhone(number).then((resp) => {
        if (resp.ok) {
          setLoginLoading(false);
          setShowPhoneModal(true);
          resent && setResentCode(true);
        } else {
          setLoginLoading(false);
          if (error) {
            setError({
              ...error,
              message: "User not found",
              phoneNumber: true,
            });
          }
        }
      });
    }
  };

  const onSignIn = (number, otp) => {
    const data = {
      phoneNumber: `${countryCode}${phoneNumber}`,
      code: otp,
    };
    phoneVerification(data)
      .then((resp) => {
        setShowPhoneModal(false);
        localStorage.setItem("x-access-token", resp.token);
        localStorage.setItem("isPremiumUser", resp.isPremiumUser);
        localStorage.setItem("isFirstUserLogin", resp.isFirstUserLogin);
        dispatch(getUserDetails(true, true, true));
        if (resp.isFirstUserLogin) {
          history.push("/initial-setup");
        } else {
          history.push(handleNavigateAfterSuccess());
        }
      })
      .catch((err) => {
        console.log("error", err);
        setError({
          ...error,
          message: "",
          otp: true,
        });

        // toast.error("Failed to verify.");
      });
  };

  const toggleRegisterModel = useCallback(() => {
    dispatch(setOpenRegisterDispatch(!showRegisterModal));
  }, [showRegisterModal]);

  const resetOtpError = useCallback(() => {
    setError({ ...error, message: "", otp: false });
  }, [error]);

  useEffect(() => {
    const timer =
      resendTime > 0 && setInterval(() => setResendTime(resendTime - 1), 1000);
    return () => clearInterval(timer);
  }, [resendTime]);
  return (
    <LoginComponent
      phoneNumber={phoneNumber}
      countryCode={countryCode}
      showPhoneModal={showPhoneModal}
      loginLoading={loginLoading}
      setShowPhoneModal={setShowPhoneModal}
      handleOnChangePhoneNumber={handleOnChangePhoneNumber}
      handleOnChangeCountryCode={handleOnChangeCountryCode}
      handleOnSubmit={onSignInForVerify}
      error={error}
      onSignIn={onSignIn}
      resetOtpError={resetOtpError}
      resentCode={resentCode}
      resendTime={resendTime}
      toggleRegisterModel={toggleRegisterModel}
      showRegisterModal={showRegisterModal}
    />
  );
};

export default Login;
